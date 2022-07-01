export class CommentDTO {
  content: string;
  authorName: string;
  creationDate: Date;

  constructor(comment: any) {
    this.content = comment.content;
    this.authorName = comment.authorName;
    this.creationDate = comment.creationDate;
  }
}
