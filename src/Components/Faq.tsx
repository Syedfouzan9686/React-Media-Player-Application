import React, { Component } from 'react'
import '../CSS/Faq.css'
import '@fortawesome/fontawesome-free/css/all.min.css';


interface FaqType {
    toggleAnswer: boolean,
    isOpen: {};
}

interface dataList_Type {
    text: string;
}

interface FaqMain_Type {
    items: {
        question: string,
        answer: {
            header: string,
            dataList: dataList_Type[]
        }
    };
    
}

class Faq extends Component<FaqMain_Type, FaqType> {

    constructor(props: FaqMain_Type) {
        super(props)
        this.state = {
            // faqData:null,
            toggleAnswer: false,
            isOpen: {},
        }

    }
   
    handleToggle() {
        this.setState({ toggleAnswer: !(this.state.toggleAnswer) })
        // this.setState({isOpen: {}})
    }
    // handleTransition(){
    //     document.addEventListener("DOMContentLoaded", () => {
    //     const changeTransition=document.getElementById("transition");

    //     if ( this.state.toggleAnswer && changeTransition) {
    //         changeTransition.style.maxHeight = this.state.toggleAnswer ? '1000px' : '0';
    //     } else {
    //         console.error("Element with ID 'transition' not found.");
    //     }
    // })}
    
    // handleTransition() {
    //     document.addEventListener("DOMContentLoaded", () => {
    //     const changeTransition = document.getElementsByClassName("li_divs");
    
    //     // Convert HTMLCollection to array
    //     const changeTransitionArray = Array.from(changeTransition) as HTMLElement[];
    
    //     // Loop through each element and modify its style
    //     changeTransitionArray.forEach(element => {
    //         element.style.display = 'block';
    //     });
    // })};

    handleOnclick() {
        this.handleToggle();
        // this.handleTransition();
    }

    clicked = "";
    transit = ""
    render() {

        const { items } = this.props;

        if (this.state.toggleAnswer) {
            this.clicked = 'questiondiv_click'
            // this.transit = "li_div"
        }
        else {
            this.clicked = 'questiondiv'
            // this.transit = "li_divs"
        }

        return (
            <div className='faqdiv'>
                <div className='qa_div'>
                    <div className={this.state.toggleAnswer ? 'questiondiv_click ' : 'questiondiv'}  onClick={this.handleOnclick.bind(this)}>
                        <div className='question_inner'>
                            {this.state.toggleAnswer ? <i className='fas fa-caret-down' /> : <i className='fas fa-caret-right' />}
                            <h4>{items.question}</h4>
                        </div>
                        {this.state.toggleAnswer ? <i className='fas fa-minus  minus' /> : <i className='fas fa-plus' />}
                    </div>
                    <div className='answerdiv'>
                            
                            <div className= {this.state.toggleAnswer ? 'li_div transit' : 'li_divs transit'} id='transition'>
                                <p>{items.answer.header}</p>
                                {items.answer.dataList.map(item => (
                                    <ul className='ul_item'>
                                    <li className='li_item'>{item.text}</li>
                                    </ul>
                                ))}
                            </div>
                        

                    </div>

                </div>

            </div>
        )
    }
}
export default Faq