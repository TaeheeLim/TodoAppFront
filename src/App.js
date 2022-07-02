import React from 'react';
import Todo from './Todo';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import './App.css';
import AddTodo from './AddTodo';
import { call, signout } from './service/ApiService'; //signout 추가

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items : [],
      /* 로딩 중이라는 상태를 표현할 변수 생성자에 상태 변수를 추가 */
      loading : true,
    };
  }

  componentDidMount(){
    /* componentDidMount에서 Todo 리스트를 가져오는
      Get 요청이 성공적으로 리턴하는 경우 loading을 false로 변경
      더이상 로딩중이 아니라는 뜻 */
    call('/todo', 'GET', null).then((response) => {
      console.log('*****')
      console.log(response)
      console.log('*****')
      this.setState({ items : response.data, loading : false })
    })
  }

  add = (item) => {
    call('/todo', 'POST', item).then((response) => {
      console.log(response)
      this.setState({ items : response.data })
    })
    // const thisItems = this.state.items;
    // item.id = "ID- " + thisItems.length;
    // item.done = false;
    // thisItems.push(item);
    // this.setState({ items : thisItems});
    // console.log("items : ", this.state.items);
  }

  delete = (item) => {
    call('/todo', 'DELETE', item).then((response) => {
      this.setState({ items : response.data })
    })
    
    // const thisItems = this.state.items;
    // console.log("Before Update Items : ", this.state.items)

    // const newItems = thisItems.filter(e => e.id !== item.id);
    // this.setState({ items: newItems }, () => {
      //디버깅 콜백
      // console.log("Update Items : ", this.state.items)
    // })
  }

  update = (item) => {
    call('/todo', 'PUT', item).then((response) => {
      console.log("update : ", response)
      this.setState({ items : response.data })
    })
  }

  render(){
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo 
              item={item} 
              key={item.id} 
              delete={this.delete} 
              update={this.update}
            />
          ))}
        </List>
      </Paper>
    );
    
    var navigationBar = (
      <AppBar position='static'>
        <Toolbar>
          <Grid justifyContent='space-between' container>
            <Grid item>
              <Typography variant='h6'>오늘의 할일</Typography>
            </Grid>
            <Grid>
              <Button color='inherit' onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
    
    //로딩 중이 아닐 때 렌더링
    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth='md'>
          <AddTodo add={this.add} />
          <div className='TodoList'>{todoItems}</div>
        </Container>
      </div>
    );

    var loadingPage = <h1> 로딩중..</h1>;

    var content = loadingPage;
    
    if(!this.state.loading){
      //로딩 중이 아니면 todoList를 선택
      content = todoListPage;
    }


    // props로 넘겨주기
      return (
        <div className='App'>{content}</div>
      );
  }
}

export default App;