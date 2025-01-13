import { render } from '@testing-library/react'
import { BottomBar } from '../bottom-bar'

describe('BottomBar', () => {
  it('can render 5 items', () => {
    expect(
      render(
        <BottomBar parentRef={null}>
          <BottomBar.Item icon={<span>mock icon</span>}>Menu 1</BottomBar.Item>
          <BottomBar.Item icon={<span>mock icon</span>}>Menu 2</BottomBar.Item>
          <BottomBar.Item icon={<span>mock icon</span>}>Menu 3</BottomBar.Item>
          <BottomBar.Item icon={<span>mock icon</span>}>Menu 4</BottomBar.Item>
          <BottomBar.Item icon={<span>mock icon</span>}>Menu 5</BottomBar.Item>
        </BottomBar>,
      ).asFragment(),
    ).toMatchSnapshot()
  })

  it('can render 4 items and an overflow menu', () => {
    expect(
      render(
        <BottomBar parentRef={null}>
          <BottomBar.Item icon={<span>mock icon</span>}>Menu 1</BottomBar.Item>
          <BottomBar.Item icon={<span>mock icon</span>}>Menu 2</BottomBar.Item>
          <BottomBar.Item icon={<span>mock icon</span>}>Menu 3</BottomBar.Item>
          <BottomBar.Item icon={<span>mock icon</span>}>Menu 4</BottomBar.Item>
          <BottomBar.MoreMenu>
            <BottomBar.MoreMenuItem>Menu 5</BottomBar.MoreMenuItem>
            <BottomBar.MoreMenuItem>Menu 6</BottomBar.MoreMenuItem>
          </BottomBar.MoreMenu>
        </BottomBar>,
      ).asFragment(),
    ).toMatchSnapshot()
  })
})
