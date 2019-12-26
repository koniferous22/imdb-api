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
			// number derived from total number of entries divided by 
			// props.entriesPerSlide (calculated in App component, since this parameter is shared between) Search and Dashboard view
			numberOfSlides: 0,
			// state parameter determines which slide is displayed
			activeSlide: 0
		};
		// events on arrow click
		this.prevSlide = this.prevSlide.bind(this)
		this.nextSlide = this.nextSlide.bind(this)
	}

	componentDidMount() {
		this.setState({
			// This should be calculated here, since when I moved it to constructor, I was getting incorrent rendering
			numberOfSlides: Math.ceil(this.props.entries.length / this.props.entriesPerSlide)
		})
	}
	
	componentDidUpdate(prevProps) {
		if (prevProps.entries !== this.props.entries || prevProps.entriesPerSlide !== this.props.entriesPerSlide) {
			this.setState({
				// recalculate new slides (happens on changing entries, or entriesPerSlide i.e. viewport width)
				numberOfSlides: Math.ceil(this.props.entries.length / this.props.entriesPerSlide),
				// changes current slide to, the slide where first element of previous view is located now
				activeSlide: Math.floor(this.state.activeSlide * prevProps.entriesPerSlide / this.props.entriesPerSlide)
			})
		}
	}

	prevSlideIndex(index) {
		// calculates index of previous slide with modular arithmetic
		return (index + this.state.numberOfSlides - 1) % this.state.numberOfSlides
	}

	prevSlide() {
		// changes to prev slide (left arrow click)
		this.setState({
			activeSlide: this.prevSlideIndex(this.state.activeSlide)
		})
	}

	nextSlideIndex(index) {
		// similar as prevSlideIndex
		return (index + 1) % this.state.numberOfSlides
	}

	nextSlide() {
		// changes to next slide (right arrow click)
		this.setState({
			activeSlide: this.nextSlideIndex(this.state.activeSlide)
		})
	}

	render() {
		if (!this.props.entries || this.props.entries.length === 0) {
			return <section />
		}

		// convert array of carousel images to 2d matrix, or 1d array with buckets,
		// where single buckets contains images per slide
		var slidesData = []
		for (var i = 0; i < this.state.numberOfSlides; i++) {
			slidesData.push({
				images: this.props.entries.slice(i * this.props.entriesPerSlide, Math.min((i + 1) * this.props.entriesPerSlide, this.props.entries.length) ),
				display: i === this.state.activeSlide
			})
		}

		// map to React Components, wrapped in CSS transition, trigerred only on visible slide
		const slides = slidesData.map((slide, slideIndex) => (
			<CSSTransition key={slideIndex} in={slide.display} timeout={300} classNames='slide'>
				<Slide images={slide.images} display={slide.display} />
			</CSSTransition>
		))

		// boolean flag, used especially in Search View, when getting few results, don't bother displaying arrows
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
