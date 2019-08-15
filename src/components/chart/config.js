export const theme = {
  "valueAxis": {
    "axisLine": {
      "show": true,
      "lineStyle": {
        "color": "#fff"
      }
    },
    "axisTick": {
      "show": true,
      "lineStyle": {
        "color": "#fff"
      }
    },
    "axisLabel": {
      "show": true,
      "textStyle": {
        "color": "#fff"
      }
    },
    "splitLine": {
      "show": false,
      "lineStyle": {
        "color": [
          "#eeeeee"
        ]
      }
    },
    "splitArea": {
      "show": false,
      "areaStyle": {
        "color": [
          "rgba(250,250,250,0.3)",
          "rgba(200,200,200,0.3)"
        ]
      }
    }
  },
  "categoryAxis": {
    "boundaryGap": false,
    "axisLine": {
      "show": true,
      "lineStyle": {
        "color": "#fff"
      }
    },
    "axisTick": {
      "show": true,
      "lineStyle": {
        "color": "#fff"
      }
    },
    "axisLabel": {
      "show": true,
      "textStyle": {
        "color": "#fff"
      }
    },
    "splitLine": {
      "show": false,
      "lineStyle": {
        "color": [
          "#eeeeee"
        ]
      }
    },
    "splitArea": {
      "show": false,
      "areaStyle": {
        "color": [
          "rgba(250,250,250,0.3)",
          "rgba(200,200,200,0.3)"
        ]
      }
    }
  },
  "line": {
    "itemStyle": {
      "color": "#2EB8F2",
      "normal": {
        "borderWidth": "2"
      }
    },
    "lineStyle": {
      "normal": {
        "width": "3"
      },
      "color": "#2EB8F2"
    },
    "symbolSize": "4",
    "symbol": "emptyCircle",
    "smooth": true,
    "areaStyle": {
      "color": {
        type: 'linear',
        x: 0,
        y: 1,
        x2: 0,
        y2: 0,
        colorStops: [{
          offset: 0,
          color: 'rgba(46, 184, 242, 0.3)'
        }, {
          offset: 1,
          color: 'rgba(46, 184, 242, 1)'
        }],
        global: false
      }
    }
  },
  "legend": {
    "textStyle": {
      "color": "#fff"
    }
  },
  "tooltip": {
    "axisPointer": {
      "lineStyle": {
        "color": "#ccc",
        "width": 1
      },
      "crossStyle": {
        "color": "#ccc",
        "width": 1
      }
    }
  },
  "grid": {
    "containLabel": true,
    "top": 10,
    "bottom": 10,
    "left": 10,
    "right": 20
  }
}
