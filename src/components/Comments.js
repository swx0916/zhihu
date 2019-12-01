import React from 'react'
import '../asstes/comments.css'
import '../../node_modules/antd/dist/antd.css'
import {Icon} from 'antd'
import axios from 'axios'
import $ from 'jquery'
import Shafa from '../asstes/img/sahfa.jpg'
import Open from '../asstes/img/open.svg'
import Close from '../asstes/img/close.svg'


class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all: '',
            long: '',
            short: '',
            ulHeight: '',
            longList: [],
            shortList: [],
            tag: true,
            flag:true


        }
    }

    render() {
        return (
            <div className="comments">
                <div className="topBox topp" ref="topBox"></div>
                <div className="ctop ctopp clearfix" ref="ctop">
                    <Icon type="arrow-left" className="goback fl" onClick={this.back.bind(this)}
                          style={{fontSize: '18px', color: '#fff'}}/>
                    <span className="commentsCount">{this.state.all}条评论</span>
                    <Icon type="form" className="write fr" style={{fontSize: '18px', color: '#fff'}}/>
                </div>

                <div className="commentsList">
                    {/*长评论*/}
                    <div className="longCom">
                        <h3 ref="long"><span>{this.state.long}</span>条长评论</h3>
                        <ul className="longL">
                            {
                                this.state.longList.map((val, i) => {
                                    return (
                                        <li className="clearfix" key={i}>
                                            <div className="fl left">
                                                <img src={val.avatar} alt=""/>
                                            </div>
                                            <div className="fl right">
                                                <div className="user clearfix">
                                                    <strong className="fl">{val.author}</strong>
                                                    <span className="fr"><Icon type="like" theme="filled" className="like" onClick={this.like.bind(this,'long', i)}/><em>{val.likes}</em></span>
                                                </div>
                                                <p className="content">
                                                    {val.content}
                                                </p>
                                                {
                                                    function () {
                                                        if(val.reply_to){
                                                            return (
                                                                <p className="reply active">
                                                                    <span className="author">//{val.reply_to.author}：</span>
                                                                    <span className="text">{val.reply_to.content}</span>
                                                                </p>
                                                            )
                                                        }
                                                    }()
                                                }
                                                <span className="time">
                                                    <span className="t">{val.time}</span>
                                                    <span className="kai" onClick={this.close.bind(this,'long',i)}>展开</span>
                                                </span>
                                            </div>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                        <div className="shafa" style={{'height': this.state.ulHeight}}>
                            <img src={Shafa} alt=""/>
                            <span>深度长评虚位以待</span>
                        </div>
                    </div>

                    {/*短评论*/}
                    <div className="shortCom">
                        <h3 ref="short"  style={{'position':'relative'}}>
                            <span>{this.state.short}</span>条短评论
                            <span className="svg" onClick={this.open.bind(this)} style={{'position':'absolute','right':'0.35rem'}}>
                                <img src={Open} style={{height:'0.5rem',width:'0.5rem'}} alt=""/>
                            </span>
                        </h3>
                        <ul className="shortL" style={{'display': 'none'}}>
                            {
                                this.state.shortList.map((val, ind) => {
                                    return (
                                        <li className="clearfix" key={ind}>
                                            <div className="fl left">
                                                <img src={val.avatar} alt=""/>
                                            </div>
                                            <div className="fl right">
                                                <div className="user clearfix">
                                                    <strong className="fl">{val.author}</strong>
                                                    <span className="fr">
                                                        <Icon type="like" theme="filled" className="like liker" onClick={this.like.bind(this, 'short',ind)}/><em>{val.likes}</em>
                                                    </span>
                                                </div>
                                                <p className="content">
                                                    {val.content}
                                                </p>
                                                {
                                                    function () {
                                                        if(val.reply_to)
                                                            return (
                                                                    <p className="reply active">
                                                                        <span className="author">//{val.reply_to.author}：</span>
                                                                        <span className="text">{val.reply_to.content}</span>
                                                                    </p>
                                                                )

                                                      }()
                                                }

                                                <span className="time">
                                                    <span className="t">{val.time}</span>
                                                    <span className="kai" onClick={this.close.bind(this,'short',ind)}>展开</span>
                                                </span>
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
    //点击展开收起回复
    close(isLong,x){
        var temp = isLong=='long'?$('.longL li'):$('.shortL li');
        if(temp.eq(x).find('.kai').html()==='收起'){
            temp.eq(x).find('.reply').addClass('active');
            temp.eq(x).find('.kai').html('展开');
        }else{
            temp.eq(x).find('.reply').removeClass('active');
            temp.eq(x).find('.kai').html('收起');
        }
    }

    //回退
    back() {
        this.props.history.go(-1)
    }
    //长短评论点赞
    like(isLong,x) {
        var temp = isLong === 'long' ? this.state.longList : this.state.shortList
        temp[x].tagZan = !temp[x].tagZan
        if(temp[x].tagZan){
            var list  = temp
            list[x].likes =  Number(list[x].likes)+1;
            this.setState({
                longList:list
            })
        }else{
            var list  = this.state.longList
            list[x].likes =  Number(list[x].likes) - 1;
            this.setState({
                longList:list
            })
        }
    }

    //点击短评论到顶部
    open() {
        this.setState({
            tag : !this.state.tag
        })
        console.log($('.svg img').prop('src'));
        if( !this.state.tag){
            $('.shortL').hide();
            $('.svg img').prop('src',Open)

        }else{
            if( $('.shortL').show()){$()
                $('.svg img').prop('src',Close)
              var shortH = $('.shortCom h3').offset().top
                document.documentElement.scrollTop = shortH - ($('.shortCom h3').outerHeight()*2)
            }
        }
    }

    componentDidMount() {
        //评论条数
        axios({
            url: '/api/4/story-extra/' + this.props.location.state.newsId,
            method: 'get'
        }).then(res => {
            if (res.data.long_comments === 0) {
                $('.longL').hide()
                $('.shafa').show()
                console.log(this.state.ulHeight);

            } else {
                $('.longL').css('height', '')
                $('.longL').show()
                $('.shafa').hide()
            }
            this.setState({
                long: res.data.long_comments,
                short: res.data.short_comments,
                all: res.data.comments,
                ulHeight: (document.documentElement.clientHeight - this.refs.ctop.offsetHeight - this.refs.topBox.offsetHeight - this.refs.short.offsetHeight - this.refs.short.offsetHeight) + 'px'
            })
        })
        //长评论
        axios({
            url: '/api/4/story/' + this.props.location.state.newsId + '/long-comments',
            method: 'get'
        }).then(res => {
            res.data.comments.map((value, index) => {
                var day = new Date(value.time * 1000);
                var month = day.getMonth() + 1;
                var date = day.getDate();
                var hour = day.getHours();
                var minute = day.getMinutes();
                var second = day.getSeconds();
                value.time = month + "-" + date + " " + hour + ":" + minute + ":" + second;
                value.tagZan = false
            })
            console.log(res.data.comments);
            this.setState({
                longList: res.data.comments
            })

        })
        //    短评论
        axios({
            url: '/api/4/story/' + this.props.location.state.newsId + '/short-comments',
            method: 'get'
        }).then(res => {
            res.data.comments.map((value, index) => {
                var day = new Date(value.time * 1000);
                var month = day.getMonth() + 1;
                var date = day.getDate();
                var hour = day.getHours();
                var minute = day.getMinutes();
                var second = day.getSeconds();
                value.time = month + "-" + date + " " + hour + ":" + minute + ":" + second;
                value.tagZan = false
            })
            this.setState({
                shortList: res.data.comments
            })
            console.log(res);
        })
    }
}

export default Comments