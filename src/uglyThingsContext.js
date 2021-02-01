import React, {Component} from 'react'
import {items} from './items';

const {Provider, Consumer} = React.createContext()
// const name = ''

class UglyThingsContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uglyItems: [],
            currentItem: {id: null, title: '', imgUrl: '', description: ''},
            isEditing: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async componentDidMount() {
        // TODO: depending on api, we will have to iterate and add id + comments key value pairs (id = index, comments are [])
        this.setState({
            uglyItems: items
        })
        // await fetch(`https://api.vschool.io/${name}/thing`)
        //     .then(res => res.json())
        //     .then((result) => {
        //         this.setState({
        //             uglyItems: result.items
        //         })
        //     }).catch((e) => console.log(e))
    }

    async handleSubmit(event, currentItem) {
        event.preventDefault();
        const payload = {
            title: event.target[0].value,
            imgUrl: event.target[1].value,
            description: event.target[2].value
        }
        if (currentItem.id !== null) {
            // UPDATE
            const updatedList = this.state.uglyItems.map((item) =>
                item.id === currentItem.id
                    ? {
                        id: currentItem.id,
                        title: event.target[0].value,
                        imgUrl: event.target[1].value,
                        description: event.target[2].value,
                        comments: currentItem.comments
                    } : item
            )
            this.setState({
                uglyItems: updatedList,
                currentItem: {id: null, title: '', imgUrl: '', description: '', comments: []},
                isEditing: false
            })
            console.log(payload)
            // await fetch(`https://api.vschool.io/${name}/thing/${id}`, {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: payload
            // })
        } else {
            // NEW
            const uglyItems = this.state.uglyItems
            currentItem.id = uglyItems.length + 1
            currentItem.comments = []
            uglyItems.push(currentItem)
            this.setState({
                uglyItems: uglyItems,
                currentItem: {id: null, title: '', imgUrl: '', description: '', comments: []},
                isEditing: false
            })
            console.log(payload)
            // await fetch(`https://api.vschool.io/${name}/thing`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: payload
            // }).catch((e) => console.log(e))
        }
        event.target.reset()
    }

    handleInputChange(event, currentItem) {
        this.setState({
            currentItem: {
                id: currentItem.id,
                title: event.target.form[0].value,
                imgUrl: event.target.form[1].value,
                description: event.target.form[2].value,
                comments: currentItem.comments
            }
        })
    }

    handleComment(event) {
        event.event.preventDefault();
        if (event.add && event.comment.length > 0) {
            // New
            this.setState({
                uglyItems: items.map((item) =>
                    item.id === event.id ? item.comments.push(event.comment) && item : item
                )
            })
            event.event.target[0].value = '';
        }
        if (!event.add) {
            // Delete
            this.setState({
                uglyItems: items.map((item) =>
                    item.id === event.id
                        ? item.comments.splice(item.comments.indexOf(event.comment), 1) && item
                        : item
                )
            })
        }
    }

    handleEdit(event) {
        this.setState({
            isEditing: true,
            currentItem: event.item
        })
    }

    handleCancel(event) {
        this.setState({
            isEditing: false,
            currentItem: {id: null, title: '', imgUrl: '', description: '', comments: []}
        })
    }

    handleDelete(event) {
        const list = this.state.uglyItems
        list.splice(this.state.uglyItems.indexOf(event.item), 1)
        this.setState({
            uglyItems: list
        })
    }

    render() {
        return (
            <Provider value={{
                uglyItems: this.state.uglyItems,
                currentItem: this.state.currentItem,
                isEditing: this.state.isEditing,
                handleInputChange: this.handleInputChange,
                handleSubmit: this.handleSubmit,
                handleComment: this.handleComment,
                handleEdit: this.handleEdit,
                handleCancel: this.handleCancel,
                handleDelete: this.handleDelete
            }}>
                {this.props.children}
            </Provider>
        )
    }
}

export {UglyThingsContextProvider, Consumer as UglyThingsContextConsumer}