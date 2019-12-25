import React from 'react'

import Arrow from './Arrow'
import Slide from './Slide'

import { CSSTransition } from 'react-transition-group'

import '../styles/components/Carousel.css'

// Carousel implementation inspired by medium article
// https://medium.com/@ItsMeDannyZ/build-an-image-slider-with-react-es6-264368de68e4

// Simple animation implemented from https://reactcommunity.org/react-transition-group/css-transition

class Carousel extends React.Component {

	constructor(props) {
		super(props)
		this.state = { 
			numberOfSlides: 0,
			activeSlide: 0
		};
		this.prevSlide = this.prevSlide.bind(this)
		this.nextSlide = this.nextSlide.bind(this)
	}

	componentDidMount() {
		this.setState({
			numberOfSlides: Math.ceil(this.props.entries.length / this.props.entriesPerSlide)
		})
	}
	
	componentDidUpdate(prevProps) {
		if (prevProps.entries !== this.props.entries || prevProps.entriesPerSlide !== this.props.entriesPerSlide) {
			this.setState({
				numberOfSlides: Math.ceil(this.props.entries.length / this.props.entriesPerSlide),
				activeSlide: Math.floor(this.state.activeSlide * prevProps.entriesPerSlide / this.props.entriesPerSlide)
			})
		}
	}

	prevSlideIndex(index) {
		return (index + this.state.numberOfSlides - 1) % this.state.numberOfSlides
	}

	prevSlide() {
		this.setState({
			activeSlide: this.prevSlideIndex(this.state.activeSlide)
		})
	}

	nextSlideIndex(index) {
		return (index + 1) % this.state.numberOfSlides
	}

	nextSlide() {
		this.setState({
			activeSlide: this.nextSlideIndex(this.state.activeSlide)
		})
	}

	render() {
		if (!this.props.entries || this.props.entries.length === 0) {
			return <section />
		}

		/*convert array to matrix*/
		var slidesData = []
		for (var i = 0; i < this.state.numberOfSlides; i++) {
			slidesData.push({
				images: this.props.entries.slice(i * this.props.entriesPerSlide, Math.min((i + 1) * this.props.entriesPerSlide, this.props.entries.length) ),
				position: i === this.state.activeSlide ? 'focus' : ''
			})
		}


		const slides = slidesData.map((slide, slideIndex) => (
			<CSSTransition key={slideIndex} in={slide.position === 'focus'} timeout={300} classNames='slide'>
				<Slide images={slide.images} position={slide.position} />
			</CSSTransition>
		))

		const displayArrows = this.props.entries.length > this.props.entriesPerSlide

		return (
			<section className='category'>
				<h3 className='title'>
					{this.props.title}
				</h3>
				<div className={"wrapper" + (displayArrows ? '' : ' no-arrows')}>
					{displayArrows && <Arrow onClick={this.prevSlide} />}
					<div className='entries'>
						{slides}
					</div>
					{displayArrows && <Arrow right onClick={this.nextSlide} />}
				</div>
			</section>
		)
	}
}

export default Carousel
