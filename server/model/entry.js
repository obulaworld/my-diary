/**
 * Created by obulaworld on 7/15/18.
 */
export default class Entry {
  constructor(id, title, category, subCategory, content) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.sub_category = subCategory;
    this.content = content;
    this.date = new Date();
  }
}
