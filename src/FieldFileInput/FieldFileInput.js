import React, {Component} from 'react';

export default class FieldFileInput extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const { onChange } = this.props,
            file = e.target.files[0];
        // console.log(file);
        onChange(file);
    }

    render() {
        const { label, types } = this.props;
        return (
            <div>
                <div id="section-head">{label}</div>
                <div>
                    <input
                        type='file'
                        accept={types}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }
}