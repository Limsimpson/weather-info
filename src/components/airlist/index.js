import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMeasure } from '../../store/action';
import './AirList.css';

class AirList extends Component {
    
    constructor(props){
        super(props);
        this.measures = {
            PM10: '미세먼지',
            PM25: '초미세먼지',
            SO2: '이산화황',
            CO: '일산화탄소',
            O3: '오존',
        }
    }

    render(){
        const titleWrap = Object.keys(this.measures).map((measure,idx)=>{
            return(
                <li key={idx} className={measure === this.props.measure ? "On" : ""} onClick={()=>{
                    this.props.setMeasure(measure)
                }}>{this.measures[measure]}</li>
            );
        });
        
        return(
            <div>
                <ul className="AirList clearfix">
                    {titleWrap}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        measure: state.measure
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMeasure: (measure) => dispatch(setMeasure(measure))
    }
}

AirList = connect(mapStateToProps, mapDispatchToProps)(AirList);
export default AirList;
