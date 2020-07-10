import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import SidoList from "../sidolist";
// import { SET_MEASURE } from "../../store/action";
require("core-js/fn/array/includes");

const sidolist = [
  "busan",
  "chungbuk",
  "chungnam",
  "daegu",
  "daejeon",
  "gangwon",
  "gwangju",
  "gyeongbuk",
  "gyeonggi",
  "gyeongnam",
  "incheon",
  "jeju",
  "jeonbuk",
  "jeonnam",
  "sejong",
  "seoul",
  "ulsan",
];

class AirInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      rankList: [],
    };
  }

  callAirInfo = (measure) => {
    const _this = this;
    axios
      .get(
        "https://simpson-proxy.netlify.app/.netlify/functions/api/weatherInfo",
        {
          params: {
            itemCode: measure,
            dataGubun: "HOUR",
            searchCondition: "WEEK",
            pageNo: 1,
            numOfRows: 1,
          },
        }
      )

      .then(function (res) {
        let data = res.data.list[0]; //deep copy
        const keys = Object.keys(data); //Object.keys = ()안의 key 값만 뽑아내기
        // keys = ['seoul', 'busan', 'itemCode', ...]
        keys.forEach((key) => {
          //forEach keys안에있는 key들을 순서대로 불러온다.
          if (!sidolist.includes(key)) {
            delete data[key];
          }
        });

        const rankList = Object.keys(data).map((sido, idx) => {
          return _this.getRank(data[sido]);
        }); //render 될 때 그 전의 탭에 남아있는 숫자들의 영향으로 색이 잠시 변경되는 현상을 막기위함

        let totalData = {};
        Object.keys(data).forEach((sido, idx) => {
          const measure = data[sido];
          const rank = rankList[idx];
          totalData[sido] = {
            value: parseFloat(measure),
            rank: rank,
          };
          // totalData['busan'] = {'value': '66', 'rank': 'normal'}
        });

        _this.setState({
          data: totalData,
        });
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  getRank = (value) => {
    let rank = "";
    if (this.props.measure === "PM10") {
      if (value > 150) {
        rank = "hell";
      } else if (value > 80) {
        rank = "bad";
      } else if (value > 30) {
        rank = "normal";
      } else {
        rank = "good";
      }
    } else if (this.props.measure === "PM25") {
      if (value > 75) {
        rank = "hell";
      } else if (value > 35) {
        rank = "bad";
      } else if (value > 15) {
        rank = "normal";
      } else {
        rank = "good";
      }
    } else if (this.props.measure === "SO2") {
      if (value > 0.15) {
        rank = "hell";
      } else if (value > 0.05) {
        rank = "bad";
      } else if (value > 0.02) {
        rank = "normal";
      } else {
        rank = "good";
      }
    } else if (this.props.measure === "CO") {
      if (value > 15) {
        rank = "hell";
      } else if (value > 9) {
        rank = "bad";
      } else if (value > 2) {
        rank = "normal";
      } else {
        rank = "good";
      }
    } else {
      if (value > 0.15) {
        rank = "hell";
      } else if (value > 0.09) {
        rank = "bad";
      } else if (value > 0.03) {
        rank = "normal";
      } else {
        rank = "good";
      }
    }
    return rank;
  };

  componentDidMount() {
    this.callAirInfo(this.props.measure);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.measure !== nextProps.measure) {
      this.callAirInfo(nextProps.measure);
    }
  }

  render() {
    return <SidoList data={this.state.data} />;
  }
}

const mapStateToProps = (state) => {
  return {
    measure: state.measure,
  };
};

AirInfo = connect(mapStateToProps)(AirInfo);
export default AirInfo;
