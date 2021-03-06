import React from 'react'
import {UglyThingsContextConsumer} from './uglyThingsContext';

function InputBox(props) {
    return <input defaultValue={props.value} required={true} className='input-box' type='text' name={props.name}
                  placeholder={props.title}/>;
}

function Header(props) {
    return (
        <UglyThingsContextConsumer>
            {context => (
                <div className='header-box'>
                    <header id='header-edit'>{context.currentItem.title}</header>
                    <form className='form-container'
                          onChange={(event) => context.handleInputChange(event, context.currentItem)}
                          onSubmit={(event) => context.handleSubmit(event, context.currentItem)}>
                        <InputBox value={context.currentItem.title} title='Title' name='title'/>
                        <InputBox value={context.currentItem.imgUrl} title='Img URL' name='imgUrl'/>
                        <InputBox value={context.currentItem.description} title='Description' name='description'/>
                        <div className='submit-container'>
                            {context.isEditing
                                ? <div><button onClick={context.handleCancel}>Cancel</button><button>Submit</button></div>
                                : <button id='submit'>Submit</button>
                            }
                        </div>
                    </form>
                </div>
            )}
        </UglyThingsContextConsumer>
    )
}

export default Header