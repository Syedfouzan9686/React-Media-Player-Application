import React, { Component } from 'react'
import '../CSS/FaqMain.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Faq from './Faq'

interface dataList_Type {
    text: string;
}

interface FaqMainType {

    question: string,
    answer: {
        header: string,
        dataList: dataList_Type[]
    }
}

interface Faq_Type {
    faqData: FaqMainType[];
}

class FaqMain extends Component<{}, Faq_Type> {

    constructor(props: any) {
        super(props)
        this.state = {
            faqData: [],
        }
    }

    readfaq() {
        const rawFile = new XMLHttpRequest();
        rawFile.open('GET', "faq.json", true);
        rawFile.send();
        rawFile.onload = () => {
            if (rawFile.readyState == 4 && rawFile.status == 200) {
                let responseobj = rawFile.response;
                let parsedData = JSON.parse(responseobj)

                this.setState({ faqData: parsedData.faqList });
                console.log(this.state.faqData)
                // console.log(parsedData);
                console.log("status sucess")
            }
        }
    }
    componentDidMount(): void {
        this.readfaq()
    }



    render() {

        return (
            <div className='faqmaindiv'>
                <div className='faqNav'>
                    <p className='p1'>Home</p><i className='fas fa-chevron-right chevron_i'/><p className='p2'>FAQ</p>
                </div>
                <h2>FAQ</h2>
                <p>How Can I help You</p>

                <div className='qa_main_div'>
                    {this.state.faqData.map(items =>
                        <Faq items={items} />
                    )}
                </div>

            </div>
        )
    }
}
export default FaqMain