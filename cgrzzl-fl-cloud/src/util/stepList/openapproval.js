/**
 * 
 * @param {在开立审核的情况下，做出来的流程条的数据流是这样的。}} val 
 */

export function openapprovalStepCurrent(val, flowNode){
    console.log(val, flowNode,  '---------val')
    let stepList = [];
    let currentNum = 1;
    // 新增开立申请节点，目前开立只有一种情况，无资方和担保审核，fundCheck ！== 1 && val.guaranteeCheck ！== 1,
    if(val.payableBillOpenType === 1){
        if(val.fundCheck === 1 && val.guaranteeCheck === 1){
            stepList = [
                {
                    name: "开立审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "担保审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "接收确认",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "平台审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "资方审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "正常持有",
                    realName: "",
                    createTime: ""
                }  
            ]
            if(flowNode === 10){
                currentNum = 0
            }else if(flowNode === 30){
                currentNum = 1
            }else if(flowNode === 40){
                currentNum = 2
            }else if(flowNode === 60){
                currentNum = 3
            }else if(flowNode === 80){
                currentNum = 4
            }else if(flowNode === 99){
                currentNum = 6
            }

        }
        else if(val.fundCheck !== 1 && val.guaranteeCheck === 1){
            stepList = [
                {
                    name: "开立审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "担保审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "接收确认",
                    realName: "",
                    createTime: ""
                },
                
                {
                    name: "平台审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "正常持有",
                    realName: "",
                    createTime: ""
                }  
            ]

            if(flowNode === 10){
                currentNum = 0
            }else if(flowNode === 30){
                currentNum = 1
            }else if(flowNode === 40){
                currentNum = 2
            }else if(flowNode === 60){
                currentNum = 3
            }else if(flowNode === 99){
                currentNum = 5
            }

        }
        else if(val.fundCheck === 1 && val.guaranteeCheck !== 1){
            stepList = [
                {
                    name: "开立审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "接收确认",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "平台审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "资方审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "正常持有",
                    realName: "",
                    createTime: ""
                }  
            ]
            
            if(flowNode === 10){
                currentNum = 0
            }else if(flowNode === 40){
                currentNum = 1
            }else if(flowNode === 60){
                currentNum = 2
            }else if(flowNode === 80){
                currentNum = 3
            }else if(flowNode === 99){
                currentNum = 5
            }
        }
        else if(val.fundCheck !== 1 && val.guaranteeCheck !== 1){
            stepList = [
                {
                    name: "开立申请",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "开立审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "接收确认",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "平台审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "正常持有",
                    realName: "",
                    createTime: ""
                }  
            ]

            if(flowNode === 10){
                currentNum = 1
            }else if(flowNode === 30){
                currentNum = 2
            }else if(flowNode === 40){
                currentNum = 3
            }else if(flowNode === 99){
                currentNum = 5
            }

        }
    }else if(val.payableBillOpenType === 2){
        if(val.fundCheck === 1 && val.guaranteeCheck === 1){
            stepList = [
                {
                    name: "邀请开单",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "核心企业确认",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "开立审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "担保审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "接收确认",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "平台审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "资方审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "正常持有",
                    realName: "",
                    createTime: ""
                }  
            ]
            if(flowNode === 10){
                currentNum = 2
            }else if(flowNode === 30){
                currentNum = 3
            }else if(flowNode === 40){
                currentNum = 4
            }else if(flowNode === 60){
                currentNum = 5
            }else if(flowNode === 80){
                currentNum = 6
            }else if(flowNode === 99){
                currentNum = 8
            }
        }else if(val.fundCheck !== 1 && val.guaranteeCheck === 1){
            stepList = [
                {
                    name: "邀请开单",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "核心企业确认",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "开立审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "担保审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "接收确认",
                    realName: "",
                    createTime: ""
                },
                
                {
                    name: "平台审核",
                    realName: "",
                    createTime: ""
                },

                {
                    name: "正常持有",
                    realName: "",
                    createTime: ""
                }  
            ]

            if(flowNode === 10){
                currentNum = 2
            }else if(flowNode === 30){
                currentNum = 3
            }else if(flowNode === 40){
                currentNum = 4
            }else if(flowNode === 60){
                currentNum = 5
            }else if(flowNode === 99){
                currentNum = 7
            }

        }else if(val.fundCheck === 1 && val.guaranteeCheck !== 1){
            stepList = [
                {
                    name: "邀请开单",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "核心企业确认",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "开立审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "接收确认",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "平台审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "资方审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "正常持有",
                    realName: "",
                    createTime: ""
                }  
            ]
            
            if(val.flowNode === 10){
                currentNum = 2
            }else if(flowNode === 40){
                currentNum = 3
            }else if(flowNode === 60){
                currentNum = 4
            }else if(flowNode === 80){
                currentNum = 5
            }else if(flowNode === 99){
                currentNum = 7
            }
            


        }else if(val.fundCheck !== 1 && val.guaranteeCheck !== 1){
            stepList = [
                {
                    name: "邀请开单",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "核心企业确认",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "开立审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "接收确认",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "平台审核",
                    realName: "",
                    createTime: ""
                },
                {
                    name: "正常持有",
                    realName: "",
                    createTime: ""
                }  
            ]

            if(flowNode === 10){
                currentNum = 2
            }else if(flowNode === 40){
                currentNum = 3
            }else if(flowNode === 60){
                currentNum = 4
            }else if(flowNode === 99){
                currentNum = 6
            }

        }
    }else if(val.payableBillOpenType === 3){
        stepList = [
            {
                name: "转让申请",
                realName: "",
                createTime: ""
            },
            {
                name: "转让审核",
                realName: "",
                createTime: ""
            },
            {
                name: "接收审核",
                realName: "",
                createTime: ""
            },
            {
                name: "正常持有",
                realName: "",
                createTime: ""
            },

        ]
        if(flowNode === 10){
            currentNum = 1
        }else if(flowNode === 30){
            currentNum = 2
        }else if(flowNode === 99){
            currentNum = 4
        }
        // if(checkType == 1) {
        //     if(flowNode === 20){
        //         currentNum = 1
        //     }else if(flowNode === 40){
        //         currentNum = 2
        //     }
        // }else {
        //     if(flowNode === 20){
        //         currentNum = 2
        //     }else if(flowNode === 40){
        //         currentNum = 2
        //     }
        // }
       console.log(currentNum, '--------currentNum')

    }

    let objContent = {
        step:stepList,
        current:currentNum
    }
    return objContent;
}