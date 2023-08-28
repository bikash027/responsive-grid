// const xAxisPoints = [];
// const yAxisPoints = [];

const setPathD = (pathEl, lineSegment, q) => {
    const [p1, p2] = lineSegment;
    pathEl.setAttribute('d', `M ${p1.x} ${p1.y} Q ${q.x} ${q.y} ${p2.x} ${p2.y}`)
}

const qPoint = (point, lineSegment) => {
    const [p1, p2] = lineSegment;
    const centerOfLine = {
        x: (p1.x + p2.x)/2,
        y: (p1.y + p2.y)/2
    }
    return {
        x: (centerOfLine.x + point.x)/2,
        y: (centerOfLine.y + point.y)/2
    }
}

const points = [];

const minLength = 0, maxLength = 500;

// for(let x = minLength; x < maxLength; x += 5){
//     for(let y = minLength; y < maxLength; y += 5){
//         points.push({x, y});
//     }
// }
const lineSegments = [];
for(let x = minLength; x < maxLength; x += 10){
    lineSegments.push([
        {x, y: minLength},
        {x, y: maxLength}
    ])
}
for(let y = minLength; y < maxLength; y += 10){
    lineSegments.push([
        {x: minLength, y},
        {x: maxLength, y}
    ])
}
const canvas = document.getElementById('canvas');
const lineSegmentElements = [];
const white = '#999999';
const pink = '#c60ac3'
for(const lineSegment of lineSegments){
    const newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // const q = p1;
    const [p1, p2] = lineSegment;
    newPath.setAttribute('stroke', Math.random()-0.5 < 0? white: pink);
    newPath.setAttribute('fill', 'transparent')
    // newPath.setAttribute('d', `M ${p1.x} ${p1.y} Q ${q.x} ${q.y} ${p2.x} ${p2.y}`)
    setPathD(newPath, lineSegment, lineSegment[0]);
    canvas.appendChild(newPath);
    lineSegmentElements.push(newPath);
}
const boundary = document.getElementById('boundary');
const domRectBoundary = boundary.getBoundingClientRect();

document.addEventListener('mousemove', (e) => {
    // const domRect = e.currentTarget.getBoundingClientRect();
    // console.log(`(${domRect.left}, ${domRect.top}) (${domRect.right}, ${domRect.bottom})`);
    const x= ((e.clientX - domRectBoundary.x)*500)/domRectBoundary.height;
    const y= ((e.clientY - domRectBoundary.y)*500)/domRectBoundary.height;
    // for(const lineSegment of lineSegmentElements){
    //     lineSegment.setAttribute('d', )
    // }
    if((x > 5 && x < 495) && (y > 5 && y < 495)){
        for(let i=0; i<lineSegments.length; i++){
            const q = qPoint({x, y}, lineSegments[i]);
            setPathD(lineSegmentElements[i], lineSegments[i], q);
        }
    } else {
        for(let i=0; i<lineSegments.length; i++){
            setPathD(lineSegmentElements[i], lineSegments[i], lineSegments[i][0]);
        }
    }
})
// boundary.addEventListener('mouseleave', (e) => {
//     const x= ((e.clientX - domRectBoundary.x)*500)/domRectBoundary.height;
//     const y= ((e.clientY - domRectBoundary.y)*500)/domRectBoundary.height;
//     // if((x < 5 || x > 495) && (y < 5 || y > 495)){
//         // for(let i=0; i<lineSegments.length; i++){
//         //     setPathD(lineSegmentElements[i], lineSegments[i], lineSegments[i][0]);
//         // }
//     // }
// })






// console.log(points);


