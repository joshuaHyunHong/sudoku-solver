console.log("main hit");

//there's a lot more strats to solving this than I thought
//but also there's some bugs cuz i don't think this is all hitting the right number of times. 

class item {
    constructor(_val, _empty) {
        this.val = _val;
        this.empty = _empty;
    }
    getVal() {
        return this.val;
    }
    setVal(newVal) {
        this.val = newVal;
    }
    getEmpty() {
        return this.empty;
    }
    setEmpty(newEmpty) {
        this.empty = newEmpty;
    }
}


function solve() {
    console.log("func hit");
    //document.getElementById("1").value = 5;

    let arr = [];
    let unsolved = [];

    for (let i = 1; i < 82; i++) {
        let num = document.getElementById(i).value;
        //console.log("Num: ", num);

        //the num is an actual input, store in arr
        if (num == "" || num < 1 || num > 9) {
            //treat 0 as a 'no input' 
            arr[i - 1] = new item(0, true);
            unsolved[unsolved.length] = (i - 1);

            console.log("no input hit");
        }
        else {
            // console.log("Num: ", num);
            arr[i - 1] = new item(num, false);
        }

    }
    console.log(arr.length);
    console.log("unsolved ", unsolved.length);

    for (let j = 0; j < unsolved.length; j++) {
        //now need to solve for the unsolved; go by row, column, then box

        //have a temp arr and get rid of each value if u come across it. If there's only 1 value left in the arr then 
        const tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const tempArrObjs = [new tempItem(1), new tempItem(2), new tempItem(3),
        new tempItem(4), new tempItem(5), new tempItem(6), new tempItem(7),
        new tempItem(8), new tempItem(9)
        ]

        const tempArrObjsCol = [new tempItem(1), new tempItem(2), new tempItem(3),
        new tempItem(4), new tempItem(5), new tempItem(6), new tempItem(7),
        new tempItem(8), new tempItem(9)
        ]

        //grab the idx of the unsolved num and calc the row, col, and box it belongs to
        //maybe this code belongs to a separate class? 

        // unsolved value % 9 || unsorted value / 9 .floor() gives the row
        //so for something like 26/3 floor(), that gives 2, so 2*9=18, go from value at idx (18,27] using a for-loop.
        //for something like 27, check prior to .floor() if 27/3==0 and if true then need to subtract 3-1.

        //gives the idx of the unsolved 0 in the arr
        let unsolvedValIdx = unsolved[j];

        //let unsolvedVal = arr[unsolvedValIdx];
        //   console.warn(unsolvedVal)

        //now calc row val
        let rowVal;


        //error here 
        if (unsolvedValIdx % 9 == 0) {
            //might need to db the next 3 lines here 

            rowVal = (unsolvedValIdx / 9);
            // if (rowVal == -1) {
            //     rowVal += 1;
            // }
            //    console.warn("hit: " , rowVal);
            // else if(unsolvedValIdx-1 % 9 == 0){
            //     unsolvedValIdx--;
            //     rowVal = Math.floor((unsolvedValIdx / 9));
            // }
        } else {
            rowVal = Math.floor((unsolvedValIdx / 9));
        }
        // console.log(rowVal);
        //  console.log("RowVal: ", rowVal, " unsolvedValidx: ", unsolvedValIdx);
        //something wrong wt the math here or the .includes() bc it's just hitting 9 times in the forloop below

        //now check for all the values in the row
        let countOfRowAnswers = 0;
        let rowAnswer = [];
        let idxTemp = 0;
        const rowVal1 = rowVal;

        //((9 * rowVal1) + 9)
        //changed to +10 so the range is inclusive.
        for (let l = ((9 * rowVal1) + 0); l < ((9 * rowVal1) + 9); l++) {
            // console.warn(l);

            //last index should be 80
            if (l < 81) {
                let val = arr[l].getVal();
                // console.log("val: ", val);
                //idxTemp++;

                let index = tempArr.indexOf(Number(val));

                if (l == unsolvedValIdx) {
                    continue;
                }
                else if (l != unsolvedValIdx && val == 0) {
                    continue;
                }
                //&& index != -1
                else if (tempArr.includes(Number(val)) && index != -1) {
                    let obj = tempArrObjs[index];
                    //   console.log("OBJ: ", obj, "idx: ", index);
                    obj.setChecked(true);
                }
            }
        }



        //console.warn("-------------------");

        for (let ij = 0; ij < tempArrObjs.length; ij++) {
            if (!tempArrObjs[ij].getChecked()) {
                //   console.log("hit 1");
                rowAnswer[idxTemp] = tempArrObjs[ij].getNumber();
                idxTemp++;
            }
        }




        // if (!tempArr.includes(Number(val))) {
        //     //       console.log("hit");
        //     for (let ij = 0; ij < tempArr.length; ij++) {
        //         if (!tempArrObjs[ij].getChecked()) {
        //             console.log("hit 1");
        //             rowAnswer[idxTemp] = tempArrObjs[ij].getNumber();
        //             idxTemp++;
        //         }

        //     }
        //     //rowAnswer = val;
        //     //     console.log("Count: ", countOfRowAnswers);
        // }
        // //if val in the row isn't a 0 then check it off 
        // else if (index != -1) {
        //     //const bool = true;
        //     let obj = tempArrObjs[index];
        //     // console.log("OBJ: ", obj, "idx: ", index);
        //     obj.setChecked(true);
        // }


        //should move this to the very end?? nah 
        // if (countOfRowAnswers == 1) {
        //     //idx+1 bc indices in an arr start at 0
        //     console.log("Solved at idx: ", unsolvedValIdx + 1, " has ROW val: ", rowAnswer);
        // }

        //unsolved value idx - (9 * number of rows) gives the col
        //for something like 26, row=2 so it'll just be 26-18=8
        //for something like 27, row=2 or 3-1, so it'll be 27-18=9 

        let colVal = unsolvedValIdx - (9 * rowVal);
        let colAnswer = [];
        let countOfColAnswers = 0;
        let idxTemp2 = 0;

        for (let h = colVal; h < 82; h += 9) {
            if (h < 81) {
                // console.log("h: ", h);
                let val = arr[h].getVal();
                //idxTemp2++;
                //  console.log("val: ", val);

                let index = tempArr.indexOf(Number(val));

                if (h == unsolvedValIdx) {
                    continue;
                }
                else if (h != unsolvedValIdx && val == 0) {
                    continue;
                }
                else if (tempArr.includes(Number(val)) && index != -1) {
                    // console.log("hit 2");
                    let obj = tempArrObjsCol[index];
                    obj.setChecked(true);
                }
            }
        }


        //using the rowVal and colVal, check for the values inside the box

        //   console.log("cVal: " , colVal , " rVal: ", rowVal);
        let cVal = colVal;
        let rVal = rowVal;
        let start = 0;
        //now calc which box we're in. Boxes are counted L to R, starting from 0.
        //set the 'start' var to the first index of the box. 
        if (rVal <= 2) {
            //box is either 0, 1, or 2
            if (cVal >= 0 && cVal <= 2) {
                start = 0;
            }
            if (cVal >= 3 && cVal <= 5) {
                start = 3;
            }
            if (cVal >= 6 && cVal <= 8) {

                start = 6;
            }
        }
        if (rVal >= 3 && rVal <= 5) {
            //box is either 3, 4, or 5
            if (cVal >= 0 && cVal <= 2) {
                start = 27;
            }
            if (cVal >= 3 && cVal <= 5) {
                start = 30;
            }
            if (cVal >= 6 && cVal <= 8) {

                start = 33;
            }
        }
        if (rVal > 5) {
            //box is either 6, 7, or 8
            if (cVal >= 0 && cVal <= 2) {
                start = 54;
            }
            if (cVal >= 3 && cVal <= 5) {
                console.warn("hit");
                start = 57;
            }
            if (cVal >= 6 && cVal <= 8) {

                start = 60;
            }
        }

        //alter colVal here 

        let ir = 0;
        for (let ik = 0; ik < 9; ik++) {
            // +1
            let idx = ((start) + 0) + ir + (ik % 3);
            //   console.log("idx: ", idx);
            let val = arr[idx].getVal();
            // console.log("val: ", val);
            if (tempArr.includes(Number(val))) {
                //     console.log("hit 2 of 2");
                let index = tempArr.indexOf(Number(val));
                let obj = tempArrObjsCol[index];
                obj.setChecked(true);
            }

            if (ik >= 2 && (ik == 2 || ik == 5)) {
                ir += 9;
            }
        }
        //    console.warn("----------");



        for (let ij = 0; ij < tempArrObjsCol.length; ij++) {
            if (!tempArrObjsCol[ij].getChecked()) {
                //   console.log("hit 1");
                colAnswer[idxTemp2] = tempArrObjsCol[ij].getNumber();
                idxTemp2++;
            }
        }




        // let val = arr[l].getVal();
        // // console.log("val: ", val);
        // //idxTemp++;

        // let index = tempArr.indexOf(Number(val));

        // if (l == unsolvedValIdx) {
        //     continue;
        // }
        // else if (l != unsolvedValIdx && val == 0) {
        //     continue;
        // }
        // //&& index != -1
        // else if (tempArr.includes(Number(val)) && index != -1) {
        //     let obj = tempArrObjs[index];
        //     //   console.log("OBJ: ", obj, "idx: ", index);
        //     obj.setChecked(true);
        // }


        // console.warn(rowAnswer);
        // let rowAnswerStr = "";
        // if (rowAnswer.length > 0) {
        //     for (let m = 0; m < rowAnswer.length; m++) {
        //         let num = rowAnswer[m];
        //         let str = num.toString();
        //         rowAnswerStr += str;
        //         //console.log(str);
        //     }
        //     unsolvedValIdx++;
        //     document.getElementById(unsolvedValIdx).value = rowAnswerStr;
        //     //console.warn(unsolvedValIdx);
        // }

        // let colAnswerStr = "";
        // if (colAnswer.length > 0) {
        //     for (let m = 0; m < colAnswer.length; m++) {
        //         let num = colAnswer[m];
        //         let str = num.toString();
        //         colAnswerStr += str;
        //         //console.log(str);
        //     }
        //     unsolvedValIdx++;
        //     document.getElementById(unsolvedValIdx).value = colAnswerStr;
        //     //console.warn(unsolvedValIdx);
        // }

        let finalAnswer = [];
        let tempIdx3 = 0;
        for (let y = 0; y < rowAnswer.length; y++) {
            for (let x = 0; x < colAnswer.length; x++) {
                let val = rowAnswer[y];
                if (val == colAnswer[x]) {
                    finalAnswer[tempIdx3] = val;
                    tempIdx3++;
                }
            }
        }

        //now print the potential answers on screen
        let finalAnswerStr = "";
        if (finalAnswer.length > 0) {
            for (let u = 0; u < finalAnswer.length; u++) {
                let num = finalAnswer[u];
                let str = num.toString();
                finalAnswerStr += str;
                //console.log(str);
            }
            unsolvedValIdx++;
            document.getElementById(unsolvedValIdx).value = finalAnswerStr;
            //console.warn(unsolvedValIdx);
        }



        //box is a bit more complex. Gotta do like -1 or +1 for 1-2 times and then -9 or +9 a bunch of times. 
        //there's 9 boxes. 
        //since u know both row and col, maybe just gotta mess around wt those 2 things. 



        //console.log("func end. Num of col answers: ", countOfColAnswers, " row answers: ", countOfRowAnswers);
        //  console.warn("j: ", unsolved.length);



        //sometimes hits when it shouldn't, esp at 0,0 case 
        // if ((countOfColAnswers == 1 || countOfColAnswers == 0) &&
        //     (countOfRowAnswers == 1 || countOfRowAnswers == 0)) {
        //     unsolvedValIdx++;
        //     if (rowAnswer == colAnswer) {
        //         document.getElementById(unsolvedValIdx).value = rowAnswer;
        //     }
        //     else if (countOfColAnswers == 1) {
        //         document.getElementById(unsolvedValIdx).value = colAnswer;
        //     }
        //     else if (countOfRowAnswers == 1) {
        //         document.getElementById(unsolvedValIdx).value = rowAnswer;
        //     }
        //     else {
        //         //0 acts as a placeholder indicating that it still needs to be solved for. 
        //         document.getElementById(unsolvedValIdx).value = 0;
        //     }
        // }
    }

}

class tempItem {
    constructor(_number) {
        this.number = _number;
        this.checked = false;
    }

    getChecked() {
        return this.checked;
    }

    setChecked(_checked) {
        this.checked = _checked;
    }

    getNumber() {
        return this.number;
    }
}


