
import React, { Component, MouseEventHandler } from 'react'
import '../CSS/Category.css'

interface Componentstate {
    Selected: string;
    handleSelected: MouseEventHandler<HTMLInputElement>;
}

class Category extends Component<Componentstate>{


    //declaration of array of objects in typescript
    radioCategory: { value: string, id: string }[] = [{ value: 'All', id: 'radio0' }, { value: 'Pop', id: 'radio2' }, { value: 'Hipop', id: 'radio3' }, { value: 'Hiplife', id: 'radio4' }, { value: 'Rock', id: 'radio5' }]



    render() {

        const { handleSelected, Selected } = this.props;

        return (

            <div className='categorydiv'>
                {this.radioCategory.map(category => <div><input className='inputs' type='radio' value={category.value} onClick={handleSelected} name='category' id={category.id} />

                    <label className='categoryLabel' htmlFor={category.id} >
                        <div className={`custom ${Selected === category.value ? 'checked' : ''}`}> {Selected === category.value && (<i className="fa fa-check checked"></i>)}</div>
                        {category.value}</label>
                </div>
                )}

            </div>

        )
    }
}
export default Category
