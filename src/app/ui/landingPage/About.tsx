import { Container } from "postcss";
import React from "react";

function About() {
  return (
    <div className="bg-black pt-10">
    <div id="about" className="container mx-auto text-white mb-7.5 bg-black">
      <div className="w-full md:h-200 p-2 flex flex-col md:flex-row items-center py-16">
        <div className="max-w-[1240px] mx-auto md:w-1/2 md:pr-8 text-slate-300">
          <h2 className="text-slate-300">
            <span className="tx-secondary">let</span> acodemy =
            &#40;School&#41; &#61;&#62; &#123;
          </h2>
          <h2 className="tx-secondary">return</h2>

          <br />
          <div className="text-justify text-lg">
          <p>
            At Acodemy, our mission is to empower individuals seeking a
            transformative career path in the dynamic world of software
            development.
          </p>
          <br />
          
          <p>
            Our comprehensive courses cater to individuals at every stage of
            their career journey, whether you`re a novice eager to delve into
            the realm of programming or a seasoned professional seeking to
            enhance your coding skills. With Acodemy, anyone, from anywhere, can
            master the art of coding!
          </p>
          <br />
          <p>
            Are you prepared to embark on your coding odyssey? Enroll now at
            Acodemy School of Programming and unlock your full potential in the
            digital landscape.
          </p>
          </div>
          <h2>&#125;;</h2>
        </div>

        <div className="w-full h-auto m-auto p-4 hover:scale-105 ease-in duration-300 shadow-lg shadow-gray-600 rounded-xl md:w-1/2 flex justify-center">
          <video className="rounded-lg " autoPlay muted loop>
            <source src="/videos/code.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
    </div>
  );
}

export default About;
