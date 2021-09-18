import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BubbleSort from './Algorithms/BubbleSort';
import MergeSort from './Algorithms/MergeSort';
import QuickSort from './Algorithms/QuickSort';
import HeapSort from './Algorithms/HeapSort';
import none from './Algorithms/none';


class Page extends React.Component{
    render(){
        return (
                <BarGraph/>
          );
    }
}

 
class BarGraph extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: [],
            steps: [],
            colorKey: [],
            colors: [],
            timeouts: [],
            currentStep: 0,
            count: 100,
            delay: 50,
            algorithm: "none"
        }
    };

    ALGORITHMS = {
        'none' : none,
		'Bubble Sort': BubbleSort,
		'Merge Sort': MergeSort,
		'Quick Sort': QuickSort,
        'Heap Sort': HeapSort,
	};


    componentDidMount = () => {
        this.resetArray();
    };

    getInt = (min, max) => {
        return Math.floor(Math.random() * max) + min;
    };

    resetArray = () => {
        console.log("reset")
        this.clearTimeouts();
        this.clearColorKey();

        let count = this.state.count;
        const array = [];

        for (let i = 0; i<count; i++){
            array.push(this.getInt(5,500));
        }
        this.setState({
            array: array, 
            steps: [array], 
            count: count,
            currentStep: 0,
        }, () => this.generateSteps());
    };

    generateSteps = () => {
		let array = this.state.array.slice();
		let steps = this.state.steps.slice();
		let colors = this.state.colors.slice();
        let algorithm = this.state.algorithm;

        console.log(algorithm)
        this.ALGORITHMS[this.state.algorithm](array, 0, steps, colors);

		this.setState({
			steps: steps,
			colors: colors,
		});
	};


    handleStart = (alg) => {
		let steps = this.state.steps;
		let colors = this.state.colors;
		this.clearTimeouts();
        this.clearColorKey();
		let timeouts = [];

		let i = 0;
		while (i < steps.length - this.state.currentStep) {
			let timeout = setTimeout(() => {
				let currentStep = this.state.currentStep;
				this.setState({
					array: steps[currentStep],
					colorKey: colors[currentStep],
					currentStep: currentStep + 1
				});
				timeouts.push(timeout);
			}, this.state.delay * i);
			i++;
		}

		this.setState({
			timeouts: timeouts,
            algorithm: alg
		}, () => this.generateSteps());
    };

    clearTimeouts = () => {
        this.state.timeouts.forEach(timeouts => clearTimeout(timeouts));
        this.setState({timeouts: []});
    };

    clearColorKey= () => {
        let blank = new Array(this.state.count).fill(0);
        this.setState({colorKey: blank, colors: [blank]})
    };


  render() {
    const count = this.state.count;
    const colors = ['#3d5af1', '#ff304f', '#83e85a'];

    return(
        
        <div className = "container" style = {{ 
            position: 'absolute', 
            width: '100%', 
            margin: '0px', 
            left: '0px',
            background: '#F2F4FF', 
            top: '0',
            height: '80%'
        }}>

            <header style = {{background: '#4CAF50', padding: '10px', margin: '0 0 20px', align: 'center', boxShadow: '5px 5px #D3D3D3'}}>
                <button onClick = {() => this.resetArray()}>Randomize!</button>
                <button className = "alg"  onClick = {() => {this.setState({algorithm: "Merge Sort"}, () => this.handleStart("Merge Sort"));}}>Merge Sort</button>
                <button className = "alg"  onClick = {() => {this.setState({algorithm: "Bubble Sort"}, () => this.handleStart("Bubble Sort")); }}>Bubble Sort</button>
                <button className = "alg"  onClick = {() => {this.setState({algorithm: "Quick Sort"}, () => this.handleStart("Quick Sort")); }}>Quick Sort</button>
                <button className = "alg"  onClick = {() => {this.setState({algorithm: "Heap Sort"}, () => this.handleStart("Heap Sort")); }}>Heap Sort</button>
                <button onClick = {() => this.handleStart(this.state.algorithm)} style = {{borderLeft: '5px black solid'}}>Start</button>
            </header>

            <div className = "body" style = {{

                align: 'left', 
                background: '#F2F4FF',
                width: '95%',
                margin: '2.5%',
                height: '100%',
                borderBottom: '4px dotted blue'
                }}>

                {this.state.array.map((value, idx) =>(
                    <div className = "array-bar" key = {idx}
                        style={{
                            backgroundColor: colors[this.state.colorKey[idx]],
                            height: `${value}px`,
                            width: `${100/count-(.40*(100/count))}%`,
                            margin: `${(.2*(100/count))}%`,
                            display: 'inline-block'
                        }}>
                    </div>

                ))}

            </div>

            <footer style = {{background: '#F2F4FF', fontFamily: 'Trebuchet MS, sans-serif'}}> 
                    <h1 style = {{textAlign: 'center'}}>Patrycja Bachleda    |      September 18, 2021</h1>
            </footer>

        </div>
    ) 
  }
}
 
ReactDOM.render(<Page />, document.getElementById('root'));