import React from 'react';

class UserAdd extends React.Component {
    constructor () {
        super();
        this.state = {
            form: {
              name: {
                valid: false,
                value: '',
                error: ''
              },
              age: {
                valid: false,
                value: 0,
                error: ''
              },
              gender: {
                valid: false,
                value: '',
                error: ''
              }
            }
          };
      }
      handleValueChange (field, value, type = 'string') {
        if (type === 'number') {
            value = +value;
          }
      
          const {form} = this.state;
      
          const newFieldObj = {value, valid: true, error: ''};
      
          switch (field) {
            case 'name': {
              if (value.length >= 5) {
                newFieldObj.error = '用户名最多4个字符';
                newFieldObj.valid = false;
              } else if (value.length === 0) {
                newFieldObj.error = '请输入用户名';
                newFieldObj.valid = false;
              }
              break;
            }
            case 'age': {
              if (value > 100 || value <= 0) {
                newFieldObj.error = '请输入1~100之间的数字';
                newFieldObj.valid = false;
              }
              break;
            }
            case 'gender': {
              if (!value) {
                newFieldObj.error = '请选择性别';
                newFieldObj.valid = false;
              }
              break;
            }
          }
      
          this.setState({
            form: {
              ...form,
              [field]: newFieldObj
            }
          });
      }
      handleSubmit (e) {
        // 阻止表单submit事件自动跳转页面的动作
        e.preventDefault();
        const {form: {name, age, gender}} = this.state;
        if (!name.valid || !age.valid || !gender.valid) {
        alert('请填写正确的信息后重试');
        return;
        }

        fetch('http://localhost:3000/user', {
        method: 'post',
        body: JSON.stringify({
            name: name.value,
            age: age.value,
            gender: gender.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.id) {
            alert('添加用户成功');
            } else {
            alert('添加失败');
            }
        })
        .catch((err) => console.error(err));
      }

    render () {
        const {name, age, gender} = this.state;
        return (
            <div>
                <header>
                <h1>添加用户</h1>
                </header>

                <main>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label>用户名：</label>
                    <input
                    type="text"
                    value={name.value}
                    onChange={(e) => this.handleValueChange('name', e.target.value)}
                    />
                    {!name.valid && <span>{name.error}</span>}
                    <br/>
                    <label>年龄：</label>
                    <input
                    type="number"
                    value={age.value || ''}
                    onChange={(e) => this.handleValueChange('age', e.target.value, 'number')}
                    />
                    {!age.valid && <span>{age.error}</span>}
                    <br/>
                    <label>性别：</label>
                    <select
                    value={gender.value}
                    onChange={(e) => this.handleValueChange('gender', e.target.value)}
                    >
                    <option value="">请选择</option>
                    <option value="male">男</option>
                    <option value="female">女</option>
                    </select>
                    {!gender.valid && <span>{gender.error}</span>}
                    <br/>
                    <br/>
                    <input type="submit" value="提交"/>
                </form>
                </main>
            </div>
        );
    }
}

export default UserAdd;