import { act, render, screen } from "@testing-library/react";

import { FileUploadQueue } from "../../file-upload-queue";
import { FileUploader } from "../../file-uploader";
import { FileUploaderFileList } from "../file-list";

function makeFile(name: string, type = "text/plain"): File {
  return new File([new Uint8Array(10)], name, { type });
}

test("throws when rendered outside a FileUploader", () => {
  expect(() => render(<FileUploaderFileList>{null}</FileUploaderFileList>)).toThrow(
    "FileUploader.FileList must be used within a FileUploader",
  );
});

test("renders a FileCard row per queued item via FileUploader.File", () => {
  const queue = new FileUploadQueue({ onUpload: async () => "file-id" });
  queue.addFiles([makeFile("a.txt")]);

  render(
    <FileUploader queue={queue}>
      <FileUploaderFileList>
        {(items) => items.map((item) => <FileUploaderFileList.File key={item.id} item={item} />)}
      </FileUploaderFileList>
    </FileUploader>,
  );

  expect(screen.getByText("a.txt")).toBeInTheDocument();
});

test("renders MediaCard tiles instead when variant is media", () => {
  const queue = new FileUploadQueue({ onUpload: async () => "file-id" });
  queue.addFiles([makeFile("a.png", "image/png")]);

  const { container } = render(
    <FileUploader queue={queue}>
      <FileUploaderFileList variant="media">
        {(items) => items.map((item) => <FileUploaderFileList.File key={item.id} item={item} />)}
      </FileUploaderFileList>
    </FileUploader>,
  );

  expect(container.querySelector("img")).toBeInTheDocument();
});

test("renders custom content via the children escape hatch", () => {
  const queue = new FileUploadQueue({ onUpload: async () => "file-id" });
  queue.addFiles([makeFile("a.txt")]);

  render(
    <FileUploader queue={queue}>
      <FileUploaderFileList>
        {(items) => (
          <ul>
            {items.map((item) => (
              <li key={item.id}>custom:{item.file.name}</li>
            ))}
          </ul>
        )}
      </FileUploaderFileList>
    </FileUploader>,
  );

  expect(screen.getByText("custom:a.txt")).toBeInTheDocument();
});

test("passes the queue to the children render function, for wiring up removal", () => {
  const queue = new FileUploadQueue({ onUpload: async () => "file-id" });
  queue.addFiles([makeFile("a.txt")]);

  render(
    <FileUploader queue={queue}>
      <FileUploaderFileList>
        {(items, receivedQueue) => {
          expect(receivedQueue).toBe(queue);
          return items.map((item) => <span key={item.id}>{item.file.name}</span>);
        }}
      </FileUploaderFileList>
    </FileUploader>,
  );

  expect(screen.getByText("a.txt")).toBeInTheDocument();
});

test("renders one hidden input per uploaded, valid item when name is provided", async () => {
  const queue = new FileUploadQueue({ onUpload: async () => "result-id" });
  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);

  render(
    <FileUploader queue={queue}>
      <FileUploaderFileList name="documentIds">
        {(items) => items.map((item) => <FileUploaderFileList.File key={item.id} item={item} />)}
      </FileUploaderFileList>
    </FileUploader>,
  );

  const hiddenInput = await screen.findByDisplayValue("result-id");
  expect(hiddenInput).toHaveAttribute("type", "hidden");
  expect(hiddenInput).toHaveAttribute("name", "documentIds");
});

test("does not render a hidden input for a queued (not yet uploaded) item", () => {
  const queue = new FileUploadQueue({ onUpload: async () => "file-id" });
  queue.addFiles([makeFile("a.txt")]);

  const { container } = render(
    <FileUploader queue={queue}>
      <FileUploaderFileList name="documentIds">
        {(items) => items.map((item) => <FileUploaderFileList.File key={item.id} item={item} />)}
      </FileUploaderFileList>
    </FileUploader>,
  );

  expect(container.querySelector('input[type="hidden"]')).not.toBeInTheDocument();
});

test("does not render a hidden input for an uploaded item reported invalid after the fact", async () => {
  const queue = new FileUploadQueue({ onUpload: async () => "result-id" });
  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);

  render(
    <FileUploader queue={queue}>
      <FileUploaderFileList name="documentIds">
        {(items) => items.map((item) => <FileUploaderFileList.File key={item.id} item={item} />)}
      </FileUploaderFileList>
    </FileUploader>,
  );

  await screen.findByDisplayValue("result-id");

  act(() =>
    queue.reportValidity([
      { file: queue.getItemsSnapshot()[0].file, validationError: "typeMismatch" },
    ]),
  );

  expect(screen.queryByDisplayValue("result-id")).not.toBeInTheDocument();
});

test("a FileUploader.File's own name prop overrides FileUploader.FileList's", async () => {
  const queue = new FileUploadQueue({ onUpload: async () => "result-id" });
  queue.addFiles([makeFile("a.txt")]);
  queue.reportValidity([]);

  render(
    <FileUploader queue={queue}>
      <FileUploaderFileList name="documentIds">
        {(items) =>
          items.map((item) => (
            <FileUploaderFileList.File key={item.id} item={item} name="overridden" />
          ))
        }
      </FileUploaderFileList>
    </FileUploader>,
  );

  const hiddenInput = await screen.findByDisplayValue("result-id");
  expect(hiddenInput).toHaveAttribute("name", "overridden");
});

test("sets the --file-uploader-columns CSS custom property when columns is provided", () => {
  const queue = new FileUploadQueue({ onUpload: async () => "file-id" });

  const { container } = render(
    <FileUploader queue={queue}>
      <FileUploaderFileList variant="media" columns={3}>
        {null}
      </FileUploaderFileList>
    </FileUploader>,
  );

  expect(container.querySelector("ul")).toHaveStyle({ "--file-uploader-columns": "3" });
});
