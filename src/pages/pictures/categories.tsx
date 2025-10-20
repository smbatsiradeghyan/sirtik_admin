import { Card }                             from 'components/card';
import React, { ChangeEvent, FC, useState } from 'react';
import { usePictures }                      from "../../contexts/pictures/usePictures";
import { useStatus }                        from "../../hooks/useStatus";
import { Popup }                            from "../../components/popup";
import { ICategory }                        from "../../helper/types";
import { getSlug }                          from "../../helper/getSlug";


export const Categories: FC = () => {
  const {categories, addCategory, selectedCategory, onSelectCategory, removeCategory} = usePictures()
  const {status, statusOff, statusOn} = useStatus()
  const [newCategory, setNewCategory] = useState<ICategory>({
    name: '',
    slug: ''
  })
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewCategory(current => ({
      ...current,
      name: e.target.value,
      slug: getSlug(e.target.value)
    }))

  const onCreateCategory = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (newCategory.name.length < 3) return
    addCategory(newCategory)
    setNewCategory({name: '', slug: ''})
    statusOff()
  }

  const onEdit = (category) => {
    setNewCategory(category)
    statusOn()
  }
  return (
    <>
      {!categories.length
        ? <div className="empty-categories">
          <h2>You don't have categories yet!</h2>
          <div className="add-category categories-list-card" onClick={statusOn}>
            <i className="fa fa-plus"/>
            Add category
          </div>
        </div>
        : <Card className="categories-list" title="Category list" action={statusOn} actionTitle={<i className="fa fa-plus"/>}>
          <div className="categories-list-content">
            {
              !categories.length
                ? <div><h2>No categories</h2></div>
                : categories.map((category, index) =>
                  <div key={category.id} className={`categories-list-card ${selectedCategory && selectedCategory?.id === category.id ? 'selected' : ''}`}>
                    <h3>{category.name}</h3>
                    <div className="ctrl">
                    <span onClick={() => onSelectCategory(category)}>
                    <i className="fa-duotone fa-solid fa-check"></i>
                    </span>
                      <span onClick={() => onEdit(category)}>
                      <i className="fa fa-edit"/>
                    </span>
                      <span onClick={() => removeCategory(category.id)}>
                      <i className="fa fa-trash"/>
                    </span>
                    </div>
                  </div>
                )
            }
          </div>


        </Card>
      }

      <Popup status={status} onClose={statusOff} title="Add category" width={500}>
        <form onSubmit={onCreateCategory}>
          <input className="category-name" value={newCategory.name} placeholder="Category name" onChange={onChange}/>
        </form>
        <button className="btn" onClick={onCreateCategory}>{newCategory.id ? "Save" : "Create"}</button>
      </Popup>
    </>

  );
}


