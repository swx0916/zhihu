import  React from 'react'
import '../asstes/index.css'
import  TopImgsrc from '../asstes/img/index_nav.jpg'
import Ling from '../asstes/img/index_ling.jpg'
import Dian from '../asstes/img/index_dian.jpg'

import axios from 'axios'
import '../../node_modules/antd-mobile/dist/antd-mobile.css'
import { Carousel, WingBlank } from 'antd-mobile';
import { Drawer, List } from 'antd-mobile';
import $ from 'jquery'

class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bannerData: [],
            imgHeight: 176,
            open: false,
            date:new Date().toLocaleDateString().split('/').join(''),
            todayData:[]
        }
      }
    render(){
        //左侧导航
        const sidebar = (<List className="sidebar">
            <div className="topBox"></div>
            <div className="login">
                <div className="info">
                    <div className="userImg">
                        <img src={TopImgsrc} alt=""/>
                        <span>宛如新生</span>
                    </div>
                    <div className="down">
                        <span><svg t="1571213679807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2687" width="0.35rem" height="0.35rem"><path d="M949.12 386.592c-4.864-15.008-17.856-25.952-33.44-28.192l-256.992-37.344-114.944-232.896c-6.976-14.144-21.376-23.104-37.152-23.104-15.776 0-30.176 8.96-37.152 23.104l-114.944 232.896L97.472 358.4c-15.616 2.272-28.576 13.184-33.44 28.192s-0.8 31.456 10.496 42.464l185.984 181.28-43.904 255.968c-2.656 15.552 3.712 31.264 16.48 40.544 12.768 9.28 29.664 10.496 43.648 3.136l229.888-120.864 229.856 120.864c6.048 3.168 12.672 4.768 19.264 4.768 8.576 0 17.152-2.656 24.352-7.904 12.768-9.28 19.136-24.992 16.48-40.544l-43.904-255.968 185.984-181.28C949.92 418.048 953.984 401.6 949.12 386.592z" p-id="2688" fill="#ffffff"></path></svg></span>
                        <span onClick={this.collect.bind(this)}>我的收藏</span>
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
            <div className="index">
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
                    <div className="topBox"></div>
                    <div className="top clearfix">
                        <img src={TopImgsrc} onClick={this.onOpenChange} className="TopImgsrc fl" alt=""/>
                        <span className="title fl">首页</span>
                        <img src={Dian} className="fr dian" alt=""/>
                        <img src={Ling} className="fr" alt=""/>
                    </div>
                    <div className="news">
                                <WingBlank>
                                    <Carousel
                                        autoplay={false}
                                        infinite
                                    >
                                        {this.state.bannerData.map(val => (
                                            <a
                                                key={val}
                                                // href="http://www.alipay.com"
                                                href="/detail"
                                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight
                                                }}
                                                onClick={(this.detail.bind(this,val.id))}
                                            >

                                                <img
                                                    src={val.image}
                                                    alt=""
                                                    style={{ width: '100%', verticalAlign: 'top' }}
                                                    onLoad={() => {
                                                        // fire window resize event to change height
                                                        window.dispatchEvent(new Event('resize'));
                                                        this.setState({ imgHeight: 'auto' });
                                                    }}
                                                />
                                                <span className="imgTitle">{val.title}</span>
                                            </a>
                                        ))}

                                    </Carousel>
                                </WingBlank>
                            </div>
                    <div className="allList">
                                {
                                    this.state.todayData.map((v,ind)=> {
                                        return (
                                            <div key={ind} className="todayHotNews">
                                                <div className="todayNews" key={ind}>
                                                    {v.date}
                                                </div>
                                                <ul className="newsList ">
                                                    {
                                                        v.stories.map((val,i)=>{
                                                            return (<li className="clearfix" key={i} onClick={this.detail.bind(this,val.id)}>
                                                                <h2 className="fl">{val.title}</h2>
                                                                <div  className="fl imgDiv">
                                                                    <img src={val.images[0]} alt=""/>
                                                                </div>
                                                            </li>)
                                                        })
                                                    }

                                                </ul>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                </div>
            </div>

        )
    }
    //我的收藏
    collect(){
        this.props.history.push({
            pathname:'/collect'
        })
    }
    //左侧导航
    onOpenChange = (...args) => {
        console.log(this.state.open);
        if(!this.state.open){
            document.body.style.overflow='hidden'
        }else{
            document.body.style.overflow=''
        }
        this.setState({ open: !this.state.open });
    }
    //回到首页
    index(){
        this.setState({ open: false });
    }

    //跳转详情页
    detail(x){
        this.props.history.push({
            pathname:'/detail',
            state:{newsId:x}
        })

    }

    //滚动事件
    handleScroll=()=>{
        //滚动条高度
        let _this=this;
        let clientH = document.documentElement.clientHeight; //可视区域高度
        let scrollT = document.documentElement.scrollTop;  //滚动条滚动高度
        let scrollH =document.documentElement.scrollHeight; //滚动内容高度

        if(scrollT+clientH >= scrollH || scrollT+clientH === scrollH){
           axios({
               url: '/api/4/news/before/' + _this.state.date,
               method: 'get',
           }).then(res => {
               var list = this.state.todayData
               list.push(res.data)
               if(res.data.date !== new Date().toLocaleDateString().split('/').join('')){
                   var week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
                   var oDate = new Date(res.data.date.substr(0,4) ,res.data.date.substr(4,2)-1, res.data.date.substr(6,2))
                   var w = oDate.getDay()
                   res.data.date =  res.data.date.substr(0,4)+'年'+res.data.date.substr(4,2)+'月'+res.data.date.substr(6,2)+'日' +week[w]
               }
               _this.setState({
                   todayData:list,
                   date:--_this.state.date
               })
           })

       }

        //吸顶
        $.each($(".allList .todayHotNews"),function (index,elem) {
            var n = 0;
            if($(window).scrollTop() >= $(this).offset().top){
                n = index;
                $('.title').html($('.todayNews').eq(n).html())
            }else if($(window).scrollTop() === 0){
                $('.title').html('首页')
            }
        })
    }
    componentWillMount()
        {
            window.addEventListener('scroll', this.handleScroll);
            //轮播图
            axios({
                url: '/api/4/news/latest',
                method: 'get'
            }).then(res => {
                if (res.data.date === new Date().toLocaleDateString().split('/').join('')) {
                    res.data.date = "今日热闻"
                }
                this.setState({
                    bannerData: res.data.top_stories,
                    todayData: [res.data],
                })
            })
        }
}

export default Index