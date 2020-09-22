import React, { Fragment } from 'react'
import { Carousel } from 'react-bootstrap'
import '../index.scss'

export default function Home ({ user }) {
  return (
    <Fragment>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.imgur.com/GU9RemN.jpg"
            alt="First slide"
          />
          <Carousel.Caption className="carousel-words">
            <h3>Education is a right...</h3>
            <p>&quot;Education is what remains after one has forgotten what one has learned in school.&quot;<br /> - Albert Einstein</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.imgur.com/iOS9R9X.jpg"
            alt="Second slide"
          />

          <Carousel.Caption className="carousel-words">
            <h3>Ask questions...</h3>
            <p>“He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever.”<br /> — Chinese Proverb</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.imgur.com/rBHDRhF.jpg"
            alt="Third slide"
          />

          <Carousel.Caption className="carousel-words">
            <h3>For you future leaders...</h3>
            <p>“Motivation is what gets you started. Habit is what keeps you going.”<br /> – Jim Ryun</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Fragment>
  )
}
