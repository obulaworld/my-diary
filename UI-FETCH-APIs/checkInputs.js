/**
 * Created by obulaworld on 8/31/18.
 */
const checkInputs = () => {
    errors = 0;
    const title = entryTitle.value;
    const category = entryCategory.value;
    const subCategory = subCat.value;
    const content = contentText.value;
    checkOthers(title, 'Title', successT, entryTitle);
    checkOthers(category, 'Category', successC, entryCategory);
    checkOthers(subCategory, 'subCategory', successS, subCat);
    checkOthers(content, 'Content', successTe, contentText);

    if (errors > 0) {
        box.scrollIntoView();
        return;
    }
    addButton.innerHTML = 'Saving....';
    const details = { title: title, category: category, subCategory: subCategory, content:content };
    SaveEntry(details);
};
