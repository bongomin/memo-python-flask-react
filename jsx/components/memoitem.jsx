import React from 'react';
import ReactDom from 'react-dom';
import Remarkable from 'remarkable';

import {FormGroup, InputGroup, FormControl, Button} from 'react-bootstrap';

class Memoitem extends React.Component{
    constructor(props) {
       super(props);
       this.state = {edit: false};
    }

    componentDidUpdate() {
        if ( this.state.edit ) {
            ReactDom.findDOMNode(this.refs.itemname).focus();
        }
    }

    handleItemClick = (ev) => {
        // Need to check if a link was clicked (can happen with markdown)
        var a = ev.target;
        var linkFound = false;

        while (a) {
            if (a.nodeName.toLowerCase() === 'a') {
                linkFound = true;
                break;
            } else {
                 a = a.parentNode;
            }
        }

        if (!linkFound) {
            ev.preventDefault();
            this.setState({edit: true});
        }
    }

    handleAcceptClick = () => {
        const item_index = this.props.item_index;
        const list_index = this.props.list_index;
        const uri = this.props.lists[list_index].items[item_index].uri;

        const content =  ReactDom.findDOMNode(this.refs.itemname).value;

        this.props.update_item_remote(list_index, item_index, content, uri);
        this.setState({edit: false});
    }

    handleCancelClick = () => {
        this.setState({edit: false});
    }

    handleKeyDown = (event) => {
         if(event.key == 'Enter'){
            this.handleAcceptClick();
         } else if(event.key == 'Escape') {
            this.handleCancelClick();
         }
    }

    handleDeleteClick = () => {
      const item_index = this.props.item_index;
      const list_index = this.props.list_index;
      const uri = this.props.lists[list_index].items[item_index].uri;

      this.props.delete_item_remote(list_index, item_index, uri);
    }

    renderMarkdown = (md) => {
        var rm = new Remarkable({linkify: true});
        var rawMarkup = rm.render(md);

        return { __html: rawMarkup }
    }

    render() {


        const item_index = this.props.item_index;
        const list_index = this.props.list_index;
        const uri = this.props.lists[list_index].items[item_index].uri;
        var content;

        if (this.state.edit) {
        content = <tr><td colSpan="3"><InputGroup bsSize="sm" className="edititem">
                <FormControl type="text" name="itemname" ref="itemname" onKeyDown={this.handleKeyDown} defaultValue={ this.props.lists[list_index].items[item_index].content }/>
                <InputGroup.Button>
                  <Button bsStyle="success" onClick={this.handleAcceptClick}><span className="glyphicon glyphicon-ok" aria-hidden="true"></span></Button>
                </InputGroup.Button>
                <InputGroup.Button>
                  <Button bsStyle="default" onClick={this.handleCancelClick}><span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></Button>
                </InputGroup.Button>
                </InputGroup></td></tr>
        } else {

        content = <tr>
                    <td className="col-sm-7 col-xs-10 first" onClick={this.handleItemClick}><span dangerouslySetInnerHTML={this.renderMarkdown(this.props.lists[list_index].items[item_index].content)} /></td>
                    <td className="col-sm-4 hidden-xs text-muted small"><div className="small pull-right">Added { this.props.lists[list_index].items[item_index].added }</div></td>
                    <td className="col-sm-2 col-xs-2 text-muted last"><div className="pull-right"><span onClick={ this.handleDeleteClick } className="text-muted glyphicon glyphicon-remove"></ span></div></td>
                  </tr>
        }

        return content;
    }
}

export default Memoitem;
