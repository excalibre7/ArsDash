import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from '@nivo/pie'

var w = window.innerWidth;
var h = window.innerHeight;

const useStyles = makeStyles((theme) => ({
  base: {
    height: "100%",
    minHeight : "100vh",
    backgroundColor: "#F6F9FC",
    display: "flex",
    flexDirection:"column",
    justifyContent: "flex-start",
    textAlign: "center",
  },
  topheader: {
    display: "flex",
    flexDirection:"row",
    justifyContent: "flex-start",
    alignItems:"center",
    backgroundColor:"#494C5E"
  },
  headerElement :{
    margin:10,
    padding:5,
    fontSize:"1.2rem",
    color:"#FFFFFFAA", 
    transition: "all .2s ease-in-out",
    "&:hover": {
        transform: "scale(1.03)",
        cursor: "pointer",
        color:"#FFFFFF",
      },
  },
  dashWrapper :{
      display:"flex",
      flexDirection:"column",
      padding:10,
      justifyContent:"center",
  },
  tableHeader : {
      display:"flex",
      flexDirection:"row",
      marginLeft:10,
      marginTop:10,
      marginRight:10,
      backgroundColor:"#494C5ECC",
      borderRadius:"5px 5px 0px 0px",
      justifyContent:"space-between",
      padding:"0px 5px"
  },
  row : {
    display:"flex",
    flexDirection:"row",
    marginLeft:10,
    marginRight:10,
    justifyContent:"space-between",
    padding:"0px 5px",
    backgroundColor: "#494C5E33",
    backdropFilter: "blur(10px)"
},
rowLast : {
    display:"flex",
    flexDirection:"row",
    marginLeft:10,
    marginRight:10,
    justifyContent:"space-between",
    padding:"0px 5px",
    backgroundColor: "#494C5E33",
    backdropFilter: "blur(10px)",
    borderRadius:"0px 0px 5px 5px"
},
  leftData : {
    width:"13vw",
    textAlign:"right",
    fontSize:"1.1rem",
    padding:5
},
headerData :{
    color:"#FFFFFFDD",
    fontSize:"1.2rem",
    paddingRight:8,
    padding:3,
    width:"5vw",
    textAlign:"right"
},
headerDataStock :{
    color:"#FFFFFFDD",
    fontSize:"1.2rem",
    paddingRight:8,
    padding:3,
    width:"15vw",
    textAlign:"right"
},
data :{
    fontSize:"1.2rem",
    paddingRight:8,
    padding:3,
    width:"5vw",
    textAlign:"center",
    textAlign:"right"
},
minitable :{
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    flex:1,
    width:"30vw"
},     
tableHeaderX : {
    display:"flex",
    flexDirection:"row",
    backgroundColor:"#494C5ECC",
    borderRadius:"5px 5px 0px 0px",
    justifyContent:"space-between",
    width:"100%",
    marginTop:10
},
rowLastX : {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    padding:"0px 5px",
    backgroundColor: "#494C5E33",
    backdropFilter: "blur(10px)",
    borderRadius:"0px 0px 5px 5px"
},
}));

export default function Login(props) {

  const classes = useStyles();
  const history = useHistory();

  const [ selectedGraph, setSelectedGraph ] = useState("WHDC IN-STOCK%");

  const d1Data = 
  [
    {
        label:"Total No. of Days",
        data:[31,28,31,30,31,30,31,31,30,31,30,31]
    },
    {
        label:"No of SKU",
        data:[52,36,24,28,40,48,24,24,52,48,16,28]
    },
    {
        label:"No of SKU Days",
        data:[1612,1008,744,840,1240,1440,744,744,1560,1488,480,868]
    },    
    {
        label:"In stock 'No of SKU days",
        data:[1456,1008,624,560,1240,1440,744,696,1560,1392,432,728]
    },
    {
        label:"In Stock %",
        data:[90,100,84,67,100,100,100,94,100,94,90,84],
        dataformx:[
            {
                month:"Jan 22",
                value:90
            },
            {
                month:"Feb 22",
                value:100
            },
            {
                month:"Mar 22",
                value:84
            },
            {
                month:"Apr 22",
                value:67
            },
            {
                month:"May 22",
                value:100
            },
            {
                month:"Jun 22",
                value:100
            }, {
                month:"Jul 22",
                value:100
            },
            {
                month:"Aug 22",
                value:94
            },
            {
                month:"Sep 22",
                value:100
            },
            {
                month:"oct 22",
                value:94
            },
            {
                month:"Nov 22",
                value:90
            },
            {
                month:"Dec 22",
                value:84
            },
        ]
    },
  ]

  const d2Data = 
    {
       SKU:
           [
            {
                id: "Stock Out",
                label: "Stock Out",
                value: 4,
                color: "hsl(225, 70%, 50%)"
            },
            {
                id: "Under Stocked",
                label: "Under Stocked",
                value: 2,
                color: "hsl(225, 70%, 50%)"
            },
            {
                id: "Efficently Stocked",
                label: "Efficently Stocked",
                value: 4,
                color: "hsl(225, 70%, 50%)"
            },
            {
                id: "Over Stocked",
                label: "Over Stocked",
                value: 4,
                color: "hsl(225, 70%, 50%)"
            },
            {
                id: "Total",
                label: "Total",
                value: 15,
                color: "hsl(225, 70%, 50%)"
            },
           ],
        SKUPerc:
           [
            {
                id: "Stock Out",
                label: "Stock Out",
                value: 27,
                color: "hsl(225, 70%, 50%)"
            },
            {
                id: "Under Stocked",
                label: "Under Stocked",
                value: 20,
                color: "hsl(225, 70%, 50%)"
            },
            {
                id: "Efficently Stocked",
                label: "Efficently Stocked",
                value: 27,
                color: "hsl(225, 70%, 50%)"
            },
            {
                id: "Over Stocked",
                label: "Over Stocked",
                value: 27,
                color: "hsl(225, 70%, 50%)"
            },
            {
                id: "Total",
                label: "Total",
                value: 100,
                color: "hsl(225, 70%, 50%)"
            },
        ],
        StockDemand:
           [
            {
                id: "Stock Out",
                label: "Stock Out",
                value: 11,
                color: "hsl(225, 70%, 50%)"
            },
            {
                id: "Under Stocked",
                label: "Under Stocked",
                value: 13,
                color: "hsl(225, 70%, 50%)"
            },
            {
                id: "Efficently Stocked",
                label: "Efficently Stocked",
                value: 53,
                color: "hsl(225, 70%, 50%)"
            },
            {
                id: "Over Stocked",
                label: "Over Stocked",
                value: 23,
                color: "hsl(225, 70%, 50%)"
            },
            {
                id: "Total",
                label: "Total",
                value: 100,
                color: "hsl(225, 70%, 50%)"
            },
           ]
        
    }

    const d3Data = 
    [
        {
            label:"Avg Min Norm Days",
            data:[15,15,20,20,70]
        },
        {
            label:"Avg Max Norm Days",
            data:[22,22,30,35,109]
        },
        {
            label:"Avg Forward Days Cover",
            data:[20,21,29,28,98]
        },    
    ]

  return (
    <div className={classes.base}>
      <div className={classes.topheader}>
          <div className={classes.headerElement} onClick={()=>setSelectedGraph("WHDC IN-STOCK%")}> WHDC IN-STOCK%</div>
          <div className={classes.headerElement} onClick={()=>setSelectedGraph("WH Stock Efficiency")}> WH Stock Efficiency</div>
          <div className={classes.headerElement} onClick={()=>setSelectedGraph("Inventory Days")}> Inventory Days</div>
      </div>
      {selectedGraph=="WHDC IN-STOCK%"?
      <div className={classes.dashWrapper}>
        <div className={classes.tableHeader}>
            <div className={classes.leftData}></div>
            <div className={classes.headerData}>Jan 22</div>
            <div className={classes.headerData}>Feb 22</div>
            <div className={classes.headerData}>Mar 22</div>
            <div className={classes.headerData}>Apr 22</div>
            <div className={classes.headerData}>May 22</div>
            <div className={classes.headerData}>Jun 22</div>
            <div className={classes.headerData}>Jul 22</div>
            <div className={classes.headerData}>Aug 22</div>
            <div className={classes.headerData}>Sep 22</div>
            <div className={classes.headerData}>Oct 22</div>
            <div className={classes.headerData}>Nov 22</div>
            <div className={classes.headerData}>Dec 22</div>
        </div>
        {d1Data.slice(0,d1Data.length-1).map((item,index)=>{
        return(
            <div className={classes.row}>
                <div className={classes.leftData}>{item.label}</div>
                {item.data.map((itemx,index)=>{
                    return(
                        <div className={classes.data}>{itemx}</div>
                    )
                    
                })}
           </div>
        )
        })}
        <div className={classes.rowLast}>
            <div className={classes.leftData}>{d1Data[d1Data.length-1].label}</div>
            {d1Data[d1Data.length-1].data.map((itemx,index)=>{
                    return(
                        <div className={classes.data}>{itemx + "%"}</div>
                    )
                    
                })}
        </div>
        <div style={{width:"95vw",height:"50vh",marginTop:25,margin:15,display:"flex",justifyContent:"center"}}>
        <ResponsiveBar
              data={d1Data[d1Data.length-1].dataformx}
              keys={["value"]}
              indexBy="month"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={["#38bcb2"]}

                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Month',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'IN Stock %',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                legendLabel={datum => "WH In Stock %"}
                role="application"
            />
        </div>
      </div>:selectedGraph=="WH Stock Efficiency"?
        <div className={classes.dashWrapper}>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",margin:10,padding:5}}>
                <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center"}}>
                    <div style={{display:"flex",textAlign:"center",fontSize:"1.1rem"}}>
                        Stock Efficiency SKU 
                    </div>
                    <div className={classes.miniTable}>
                        <div className={classes.tableHeaderX}>
                        {d2Data.SKU.map((item,index)=>{
                            return(
                                <div style={{padding:"4px 8px",width:"20%",color:"#FFFFFF"}}>{item.label}</div>
                            )
                        })}
                        </div>
                        <div className={classes.rowLastX}>
                        {d2Data.SKU.map((item,index)=>{
                            return(
                                <div style={{padding:"4px 8px",width:"20%",fontSize:"1.3rem"}}>{item.value}</div>
                            )
                        })}
                        </div>
                    </div>
                </div>    
                <div style={{display:"flex",flexDirection:"column",width:"33%",justifyContent:"flex-start",alignItems:"center"}}>
                    <div style={{display:"flex",fontSize:"1.1rem"}}>
                        Stock Efficiency SKU 
                    </div>
                    <div className={classes.miniTable}>
                        <div className={classes.tableHeaderX}>
                        {d2Data.SKUPerc.map((item,index)=>{
                            return(
                                <div style={{padding:"4px 8px",width:"20%",color:"#FFFFFF"}}>{item.label}</div>
                            )
                        })}
                        </div>
                        <div className={classes.rowLastX}>
                        {d2Data.SKUPerc.map((item,index)=>{
                            return(
                                <div style={{padding:"4px 8px",width:"20%",fontSize:"1.3rem"}}>{item.value+"%"}</div>
                            )
                        })}
                        </div>
                    </div>
                </div>    
                <div style={{display:"flex",flexDirection:"column",width:"33%",justifyContent:"flex-start",alignItems:"center"}}>
                    <div style={{display:"flex",fontSize:"1.1rem"}}>
                        Stock Efficiency SKU 
                    </div>
                    <div className={classes.miniTable}>
                        <div className={classes.tableHeaderX}>
                        {d2Data.StockDemand.map((item,index)=>{
                            return(
                                <div style={{padding:"4px 8px",width:"20%",color:"#FFFFFF"}}>{item.label}</div>
                            )
                        })}
                        </div>
                        <div className={classes.rowLastX}>
                        {d2Data.StockDemand.map((item,index)=>{
                            return(
                                <div style={{padding:"4px 4px",width:"20%",fontSize:"1.3rem"}}>{item.value +"%"}</div>
                            )
                        })}
                        </div>
                    </div>
                </div>    
            </div>  
            <div style={{display:"flex",flexDirection:"row"}}>
                <div style={{width:"47vw",height:"50vh"}}>
                <ResponsivePie
                    data={d2Data.SKUPerc.slice(0,d2Data.SKU.length-1)}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.2
                            ]
                        ]
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                2
                            ]
                        ]
                    }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    fill={[
                        {
                            match: {
                                id: 'ruby'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'c'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'go'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'python'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'scala'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'lisp'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'elixir'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'javascript'
                            },
                            id: 'lines'
                        }
                    ]}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            justify: false,
                            translateX: 0,
                            translateY: 56,
                            itemsSpacing: 20,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ]
                        }
                    ]}
                />
                </div>
                <div style={{width:"47vw",height:"50vh"}}>
                    <ResponsivePie
                        data={d2Data.StockDemand.slice(0,d2Data.SKU.length-1)}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        borderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    0.2
                                ]
                            ]
                        }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    2
                                ]
                            ]
                        }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'ruby'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'c'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'go'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'python'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'scala'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'lisp'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'elixir'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'javascript'
                                },
                                id: 'lines'
                            }
                        ]}
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                justify: false,
                                translateX: 0,
                                translateY: 56,
                                itemsSpacing: 20,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999',
                                itemDirection: 'left-to-right',
                                itemOpacity: 1,
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
            </div>     
        </div>
        :
        <div className={classes.dashWrapper}>
            <div className={classes.tableHeader}>
                <div className={classes.leftData}></div>
                <div className={classes.headerDataStock}>RM Vendor</div>
                <div className={classes.headerDataStock}>WIP @ Vendor</div>
                <div className={classes.headerDataStock}>FG @ Vendor</div>
                <div className={classes.headerDataStock}>WH</div>
                <div className={classes.headerDataStock}>Total</div>
            </div>
            {d3Data.slice(0,d3Data.length-1).map((item,index)=>{
            return(
                <div className={classes.row}>
                    <div className={classes.leftData}>{item.label}</div>
                    {item.data.map((itemx,index)=>{
                        return(
                            <div className={classes.data}>{itemx}</div>
                        )
                        
                    })}
            </div>
            )
            })}
            <div className={classes.rowLast}>
                <div className={classes.leftData}>{d3Data[d3Data.length-1].label}</div>
                {d3Data[d3Data.length-1].data.map((itemx,index)=>{
                        return(
                            <div className={classes.data}>{itemx}</div>
                        )
                        
                    })}
            </div>
        </div>}
    </div>
  );
}
