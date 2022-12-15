export class Content {
  private readonly content: string;

  get value() {
    return this.content;
  }

  constructor(content) {
    const isContentLengthValid = this.validateContentLength(content);

    if (!isContentLengthValid) throw new Error('Content length error.');

    this.content = content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }
}
