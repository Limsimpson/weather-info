import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSido } from '../../store/action';
import './Sidolist.css';

const sidoEngToKor = {
    'busan': '부산',
    'chungbuk': '충북',
    'chungnam': '충남',
    'daegu': '대구',
    'daejeon': '대전',
    'gangwon': '강원',
    'gwangju': '광주',
    'gyeongbuk': '경북',
    'gyeonggi': '경기',
    'gyeongnam': '경남',
    'incheon': '인천',
    'jeju': '제주',
    'jeonbuk': '전북',
    'jeonnam': '전남',
    'sejong': '세종',
    'seoul': '서울',
    'ulsan': '울산'
}

const rankEngToKor = {
    'hell' : '최악',
    'bad' : '나쁨',
    'normal' : '보통',
    'good' : '좋음'
}

// sidoEngToKor.busan = sidoEngToKor['busan']

class SidoList extends Component {
    
    constructor(props){
        super(props);
        this.sidos = {
            busan: '부산',
            chungbuk: '충북',
            chungnam: '충남',
            daegu: '대구',
            daejeon: '대전',
            gangwon: '강원',
            gwangju: '광주',
            gyeongbuk: '경북',
            gyeonggi: '경기',
            gyeongnam: '경남',
            incheon: '인천',
            jeju: '제주',
            jeonbuk: '전북',
            jeonnam: '전남',
            sejong: '세종',
            seoul: '서울',
            ulsan: '울산'
        }
    }

    render(){
        const sidoWrap = Object.keys(this.props.data).map((sido,idx)=>{
            return(
                <li key={idx} className={sido} onClick={()=>{this.props.setSido(sido)}}>
                    {sidoEngToKor[sido]}
                    <span className={`sidoValue ${this.props.data[sido].rank}`}>{this.props.data[sido].value}</span>
                    {/* this.props.data[sido] = {'value': '66', 'rank': 'normal'} */}
                </li>
            );        
        })

        const infoWrap = Object.keys(this.props.data).map((sido,idx)=>{

            const rank = this.props.data[sido].rank
            
            console.log(sido, this.props.sido);

            return(
                <li key={idx} className={`infoBox${rank} ${sido === this.props.sido ? "On" : ""}`}>
                    <p>{sidoEngToKor[sido]}</p>
                    <p>{this.props.data[sido].value}</p>
                    <p>{rankEngToKor[rank]}</p>
                </li>
            );
        })

        return(
            <div className="wrap clearfix">
                <div className="sidoWrap">
                    <ul>
                        {sidoWrap}
                    </ul>
                </div>
                <div className="infoWrap">
                    <ul className="infoBox">
                        {infoWrap}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sido: state.sido
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSido: (sido) => dispatch(setSido(sido))
    }
}

SidoList = connect(mapStateToProps, mapDispatchToProps)(SidoList);

export default SidoList;