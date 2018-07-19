export default class CreateEntry {
  constructor(id, title, category, subCategory, content) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.sub_category = subCategory;
    this.content = content;
    this.date = new Date();
  }
}
