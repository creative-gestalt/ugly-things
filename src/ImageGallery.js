import React from 'react'
import {FaCheck, FaPen, FaTimes, FaTrash} from 'react-icons/fa'
import {UglyThingsContextConsumer} from "./uglyThingsContext";

function ImageGallery(props) {
    return (
        <UglyThingsContextConsumer>
            {context => (
                <ul className='items'>
                    {context.uglyItems.map((uglyItem) =>
                        <Post
                            item={uglyItem}
                            key={uglyItem.id}
                            id={uglyItem.id}
                            title={uglyItem.title}
                            imgUrl={uglyItem.imgUrl}
                            description={uglyItem.description}
                            comments={uglyItem.comments}
                            context={context}
                        />
                    )}
                </ul>
            )}
        </UglyThingsContextConsumer>
    )
}

function Post(props) {
    return (
        <li className='item' key={props.id}>
            <div className='card'>
                <div className='modify-container'>
                    <button className='edit-post-icon' onClick={() => props.context.handleEdit({item: props.item})}>
                        <FaPen/>
                    </button>
                    <button className='delete-post-icon' onClick={() => props.context.handleDelete({item: props.item})}>
                        <FaTimes />
                    </button>
                </div>
                <img className='ugly-images' src={props.imgUrl} alt='img'/>
                <p className='ugly-title'>{props.title}</p>
                <p className='ugly-description'>{props.description}</p>
                <Comments
                    id={props.id}
                    comments={props.comments}
                    context={props.context}
                />
            </div>
        </li>
    )
}

function Comments(props) {
    return (
        <ul className='comments'>
            <CommentInputBox id={props.id} context={props.context}/>
            {props.comments.map((comment, index) =>
                <li key={index}>
                    {comment}
                    <FaTrash className='delete-icon' size={11} onClick={(e) => props.context.handleComment({id: props.id, event: e, add: false})}/>
                </li>
            )}
        </ul>
    )
}

function CommentInputBox(props) {
    return (
        <form className='comment-form-container' onSubmit={(event) =>
            props.context.handleComment({
                id: props.id,
                comment: event.target[0].value,
                event: event,
                add: true
            })
        }>
            <input className='comment-box' type='text' placeholder='Comment'/>
            <button>
                <FaCheck />
            </button>
        </form>
    )
}

export default ImageGallery