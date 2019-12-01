import React from 'react'
import  TopImgsrc from '../asstes/img/index_nav.jpg'
import '../../node_modules/antd-mobile/dist/antd-mobile.css'
import { Carousel, WingBlank } from 'antd-mobile';
import { Drawer, List } from 'antd-mobile';

class Collect extends React.Component {
    constructor(props){
        super(props);
        this.state={
            collectList:[],
            newsId:'',
            open :false

        }

    }
    render(){
        const sidebar = (<List className="sidebar">
            <div className="topBox"></div>
            <div className="login" style={{'paddingTop': '0rem'}}>
                <div className="info">
                    <div className="userImg">
                        <img src={TopImgsrc} onClick={this.onOpenChange} alt=""/>
                        <span>宛如新生</span>
                    </div>
                    <div className="down">
                        <span><svg t="1571213679807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2687" width="0.35rem" height="0.35rem"><path d="M949.12 386.592c-4.864-15.008-17.856-25.952-33.44-28.192l-256.992-37.344-114.944-232.896c-6.976-14.144-21.376-23.104-37.152-23.104-15.776 0-30.176 8.96-37.152 23.104l-114.944 232.896L97.472 358.4c-15.616 2.272-28.576 13.184-33.44 28.192s-0.8 31.456 10.496 42.464l185.984 181.28-43.904 255.968c-2.656 15.552 3.712 31.264 16.48 40.544 12.768 9.28 29.664 10.496 43.648 3.136l229.888-120.864 229.856 120.864c6.048 3.168 12.672 4.768 19.264 4.768 8.576 0 17.152-2.656 24.352-7.904 12.768-9.28 19.136-24.992 16.48-40.544l-43.904-255.968 185.984-181.28C949.92 418.048 953.984 401.6 949.12 386.592z" p-id="2688" fill="#ffffff"></path></svg></span>
                        <span>我的收藏</span>
                        <span><svg t="1571213763325" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3488" width="0.35rem" height="0.35rem"><path d="M640 469.333333h170.666667l-298.666667 298.666667-298.666667-298.666667h170.666667V85.333333h256v384zM213.333333 853.333333h597.333334v85.333334H213.333333v-85.333334z" p-id="3489" fill="#ffffff"></path></svg></span>
                        <span>离线下载</span>
                    </div>
                </div>
                <div className="indexgrey">
                    <span><svg t="1571214174871" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4968" width="0.45rem" height="0.36rem"><path d="M999.936 509.44l-449.024-389.12c-9.216-11.264-23.552-18.432-38.912-18.432s-29.696 7.168-38.912 18.432l-449.024 389.12C9.728 518.656 0 534.528 0 552.96c0 26.624 19.968 48.128 46.08 50.688v0.512h81.92v317.44c0 28.16 23.04 51.2 51.2 51.2h204.8c28.16 0 51.2-23.04 51.2-51.2v-209.92c0-28.16 23.04-51.2 51.2-51.2h51.2c28.16 0 51.2 23.04 51.2 51.2v209.92c0 28.16 23.04 51.2 51.2 51.2h204.8c28.16 0 51.2-23.04 51.2-51.2v-317.44h76.8c28.16 0 51.2-23.04 51.2-51.2 0-18.432-9.728-34.304-24.064-43.52z" fill="#1296db" p-id="4969"></path></svg></span>
                    <span onClick={this.index.bind(this)}>首页</span>
                </div>
            </div>
        </List>);
        return(
            <div className="collect">
                <div className="show">
                    <Drawer
                        className="my-drawer"
                        style={{  }}
                        enableDragHandle
                        sidebar={sidebar}
                        open={this.state.open}
                        onOpenChange={this.onOpenChange}
                    >
                    </Drawer>
                    <div style={{'position':'relative'}}>
                        <div className="topBox"></div>
                        <div className="top clearfix">
                            <img src={TopImgsrc} onClick={this.onOpenChange} className="TopImgsrc fl" alt=""/>
                            <span className="title fl"><span>{this.state.collectList.length}</span>条收藏</span>
                        </div>
                        <ul className="newsList ">
                            {
                                this.state.collectList.map((val,i)=>{
                                    return (
                                        <li className="clearfix" key={i} onClick={this.detail.bind(this,val.id)}>
                                            <h2 className="fl">{val.title}</h2>
                                            <div  className="fl imgDiv">
                                                <img src={val.img} alt=""/>
                                            </div>
                                        </li>
                                    )
                                })
                            }


                        </ul>
                    </div>
                </div>


            </div>
        )
    }
    onOpenChange = (...args) => {
        console.log(args);
        console.log(this.state.open);
        if(!this.state.open){
            document.body.style.overflow='hidden'
        }else{
            document.body.style.overflow=''
        }
        this.setState({ open: !this.state.open });
    }
    //首页
    index(){
        this.props.history.push({
            pathname:'/index'
        })
    }
    //详情
    detail(x){
        this.props.history.push({
            pathname:'/detail',
            state:{newsId:x}
        })
    }
    componentWillMount(){
        for(var i = 0;i<localStorage.length;i++){
            var obj = localStorage.getItem(localStorage.key(i));
            console.log(obj);
            var arr = this.state.collectList
            arr.push(JSON.parse(obj))
            if(obj!=='WARN'){
                this.setState({
                    collectList:arr
                })
                console.log(this.state.collectList);
            }
        }
    }

}
export  default  Collect