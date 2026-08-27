# Writing Clarity Guideline

> **Note:** When writing or editing prose, use the `writing-clear-prose` skill (`.opencode/skills/writing-clear-prose.md`). This guideline serves as comprehensive reference documentation.

## Purpose

This guideline provides quick-reference principles for writing clear, concise prose that humans will read. Apply these rules to documentation, error messages, commit messages, UI text, comments, explanations, and any other human-facing text.

## Language Standard

**Use British English spelling and conventions in all prose.** This includes documentation, comments, error messages, and UI text.

Examples:

- colour (not color)
- analyse (not analyze)
- organise (not organize)
- realise (not realize)
- centre (not center)
- favour (not favor)

**Note**: Code identifiers (variable names, function names, class names) may use American English if required by external APIs or established conventions, but all surrounding prose should use British English.

## When to Apply This Guideline

Use these principles whenever writing sentences for humans:

- Documentation, README files, technical explanations
- Commit messages, pull request descriptions
- Error messages, UI copy, help text
- Code comments for complex logic
- Reports, summaries, or explanations

## Essential Principles

### 1. Use Active Voice (Rule 10)

Active voice is more direct, vigorous, and concise than passive.

**❌ Weak**: The error was encountered by the system.  
**✅ Strong**: The system encountered an error.

**❌ Weak**: This component can be used for layout.  
**✅ Strong**: Use this component for layout.

### 2. Put Statements in Positive Form (Rule 11)

Make definite assertions. Avoid tame, hesitating language. Use "not" for denial or antithesis, never for evasion.

**❌ Weak**: did not remember  
**✅ Strong**: forgot

**❌ Weak**: did not pay attention to  
**✅ Strong**: ignored

**❌ Weak**: not very often on time  
**✅ Strong**: usually late

### 3. Use Definite, Specific, Concrete Language (Rule 12)

Prefer the specific to the general, the definite to the vague, the concrete to the abstract.

**❌ Vague**: A period of unfavorable weather set in.  
**✅ Specific**: It rained every day for a week.

**❌ Vague**: The function takes a parameter.  
**✅ Specific**: The function takes a `userId` string parameter.

### 4. Omit Needless Words (Rule 13)

Vigorous writing is concise. Make every word tell.

| ❌ Needless Words          | ✅ Concise          |
| -------------------------- | ------------------- |
| the question as to whether | whether             |
| there is no doubt but that | no doubt, doubtless |
| used for fuel purposes     | used for fuel       |
| he is a man who            | he                  |
| in a hasty manner          | hastily             |
| owing to the fact that     | since, because      |
| in spite of the fact that  | though, although    |

**Special offender**: "the fact that"; revise it out of every sentence.

### 5. Keep Related Words Together (Rule 16)

The position of words shows their relationship. Keep related words close; separate unrelated ones.

**❌ Poor**: Wordsworth, in the fifth book of The Excursion, gives a description.  
**✅ Better**: In the fifth book of The Excursion, Wordsworth gives a description.

**❌ Poor**: He only found two errors.  
**✅ Better**: He found only two errors.

### 6. Place Emphatic Words at End (Rule 18)

The most prominent position in a sentence is the end. Place the word or idea you want to emphasize there.

**❌ Weak ending**: Humanity has hardly advanced in fortitude since that time, though it has advanced in many other ways.  
**✅ Strong ending**: Humanity, since that time, has advanced in many other ways, but it has hardly advanced in fortitude.

## Grammar Essentials for Technical Writing

### Comma Before Coordinating Conjunction (Rule 4)

Place a comma before conjunctions (and, but, for, or, nor) joining independent clauses.

**✅ Correct**: The test failed, and the build was canceled.

### Don't Join Independent Clauses with Comma (Rule 5)

Use a semicolon or period, not just a comma.

**❌ Wrong**: The API call succeeded, the data was cached.  
**✅ Correct**: The API call succeeded; the data was cached.  
**✅ Correct**: The API call succeeded, and the data was cached.

### One Paragraph Per Topic (Rule 8)

Each paragraph should address a single topic. The beginning of each paragraph signals a new step to the reader.

### Begin with Topic Sentence (Rule 9)

Start paragraphs with a topic sentence that states the main idea. This helps readers quickly grasp the purpose.

## Common Word Misuses in Technical Writing

- **data**: Plural (these data, not this data)
- **less vs. fewer**: Less for quantity, fewer for number
- **different from**: Not "different than"
- **whether**: Sufficient alone; not "as to whether"
- **like vs. as**: "like" governs nouns; "as" introduces clauses

## Quick Self-Edit Checklist

When revising prose, check for:

1. ✅ Active voice where possible
2. ✅ Positive form (avoid unnecessary "not")
3. ✅ Concrete, specific terms instead of vague generalities
4. ✅ No needless words or phrases
5. ✅ Related words kept together
6. ✅ Emphatic words at sentence end
7. ✅ One topic per paragraph
8. ✅ Proper punctuation of independent clauses

## When to Fetch the Full Guide

Fetch the complete Elements of Style when:

- Writing substantial documentation or explanatory prose
- Editing important user-facing text for maximum clarity
- Unsure about a specific grammar rule or word usage
- Context budget allows (~12,000 tokens)
- Quality of writing is critical (error messages, in-app help, API docs)

## Remember

**If you're writing sentences for a human to read, apply these principles.**

The goal is not perfection, but clarity, directness, and respect for the reader's time and attention.
