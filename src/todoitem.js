import React from "react";
import ReactTooltip from "react-tooltip";

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done: props.todoItem.done
    };
  }

  toggleDone = () => {
    fetch(
      `https://kst-todo-list.herokuapp.com/todo/${this.props.todoItem.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: this.props.todoItem.title,
          done: !this.state.done
        })
      }
    )
      .then(
        this.setState({
          done: !this.state.done
        })
      )
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="todo-item">
        <p data-tip="Delete">
          <button
            className="delete-btn"
            onClick={() => this.props.deleteItem(this.props.todoItem.id)}
          >
            x
          </button>
        </p>
        <ReactTooltip />
        <input
          onClick={this.toggleDone}
          type="checkbox"
          defaultChecked={this.state.done}
        />

        <p className={this.state.done ? "done" : null}>
          {this.props.todoItem.title}
        </p>
      </div>
    );
  }
}
