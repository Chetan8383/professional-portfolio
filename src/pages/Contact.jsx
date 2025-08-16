import React, { useRef, useState } from 'react';
import { BadgeCheck, Github, Instagram, Linkedin, Mail, Phone, Send } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import SplitText from 'gsap/SplitText';

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(leftRef.current,
      { x: -100, opacity: 0 }, // initial
      {
        x: 0, opacity: 1, duration: 1,
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 60%",
          toggleActions: "play reverse play reverse",
          // play on enter, reverse on leave, 
          // play again on enterBack, reverse on leaveBack
        }
      }
    );

    gsap.fromTo(rightRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1,
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 60%",
          toggleActions: "play reverse play reverse",
        }
      }
    );
  }, []);

  useGSAP(() => {
    const split = new SplitText('#contact-heading', { type: 'chars' });

    gsap.from(split.chars, {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotateX: 45,
      transformOrigin: 'top center',
      ease: 'back.out(1.7)',
      stagger: 0.05,
      duration: 1.2,
      scrollTrigger: {
        trigger: '#contact-heading',
        start: 'top 80%',
        toggleActions: 'play none none none', // 👈 play once only
      },
    });
  }, []);


  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      message: Yup.string()
        .min(10, 'Must be at least 10 characters')
        .required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true)
        setSubmitStatus(null);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_key: '786d87fd-3e16-4a69-a763-8a42c59fc5bf', // important
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            message: values.message,
            subject: 'Reached Through Portfolio',
          }),
        });

        const data = await response.json();

        if (data.success) {
          resetForm();
          setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
          toast.success('Successfully toasted!')
        } else {
          toast.error('Something went wrong. Please try again.');
          setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Error submitting form. Please try again later.');
        setSubmitStatus({ type: 'error', message: 'Error submitting form. Please try again later.' });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="bg-bg dark:bg-bg-dark text-text dark:text-text-dark mb-10 ">
      <h1 id="contact-heading" className="font-bitcount text-5xl text-center">
        Contact Me
      </h1>


      <div className="max-w-5xl mx-auto  flex-col md:flex-row p-4 flex gap-4" >
        {/* left */}
        <div ref={leftRef} className="w-full md:w-1/2 flex p-4 items-end justify-center rounded-3xl bg-cover bg-center bg-[url('/contact-bg.jpg')] dark:bg-[url('/contact-bg-dark.jpg')]">

          <div className='backdrop-blur-2xl p-2 w-full text-sm rounded-2xl bg-bg/5 dark:bg-bg-dark/5 border border-border dark:border-border-dark text-text dark:text-text-dark'>
            <h1 className='tracking-widest'>Chetan Mehra </h1>
            <p className='font-bitcount text-accent dark:text-accent-dark'>Focused on Front-End</p>
            <div className=' flex gap-4 my-3'>
              <a
                href="https://github.com/Chetan8383"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:-translate-y-2 hover:scale-110 "
              >
                <Github className='size-5 ' />
              </a>
              <a
                href="https://www.linkedin.com/in/chetan-mehra/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300  hover:-translate-y-2 hover:scale-110"
              >
                <Linkedin className="size-5" />
              </a>
              <a
                href="https://www.instagram.com/_chetanmehra/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:-translate-y-2 hover:scale-110"
              >
                <Instagram className="size-5" />
              </a>
            </div>

            <small className='text-text-secondary dark:text-text-secondary-dark'>I am available for freelance work. Connect with me via and call in to my account.</small>

            {/* email and phone number */}
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2">
                <Mail className='size-4' />
                <a
                  href="mailto:chetanmehra095@gmail.com"
                  className=" hover:underline"
                >
                  chetanmehra095@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className='size-4' />
                <a
                  href="tel:+918383914579"
                  className=" hover:underline"
                >
                  +91 8383914579
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div ref={rightRef} className="p-4 flex-col rounded-3xl border border-border dark:border-border-dark shadow-md w-full md:w-1/2">
          <div className="flex flex-col">
            <h1 className="text-xl font-light">Have a project idea?</h1>
            <h1 className="text-xl font-medium">Let's discuss it together.</h1>
          </div>

          <small className="text-xs text-text-secondary dark:text-text-secondary-dark">
            I'm always open to new opportunities. Feel free to drop me a line if having any questions or projects.
          </small>

          {/* Inline Success/Error Message */}

          <form
            onSubmit={formik.handleSubmit}
            className="inputs mt-10 w-full space-y-4"
          >
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <label htmlFor="firstName" className="flex flex-col gap-1 w-full">
                <span className="text-xs">First Name</span>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="E.g. John"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  className="text-sm bg-primary dark:bg-primary-dark px-4 py-2 rounded-xl focus:outline outline-border dark:outline-border-dark"
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-accent dark:accent-accent-dark text-xs">{formik.errors.firstName}</div>
                ) : null}
              </label>

              <label htmlFor="lastName" className="flex flex-col gap-1 w-full">
                <span className="text-xs">Last Name</span>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="E.g. Doe"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  className="text-sm bg-primary dark:bg-primary-dark px-4 py-2 rounded-xl focus:outline outline-border dark:outline-border-dark"
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-accent dark:accent-accent-dark text-xs">{formik.errors.lastName}</div>
                ) : null}
              </label>
            </div>

            <label htmlFor="email" className="flex flex-col gap-1 w-full">
              <span className="text-xs">Email</span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="E.g. example@gmail.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="text-sm bg-primary dark:bg-primary-dark px-4 py-2 rounded-xl focus:outline outline-border dark:outline-border-dark"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-accent dark:accent-accent-dark text-xs">{formik.errors.email}</div>
              ) : null}
            </label>

            <label htmlFor="message" className="flex flex-col gap-1 w-full">
              <span className="text-xs">Message</span>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="E.g. Want to know the next step"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                className="text-sm bg-primary dark:bg-primary-dark px-4 py-2 rounded-xl focus:outline outline-border dark:outline-border-dark"
              />
              {formik.touched.message && formik.errors.message ? (
                <div className="text-accent dark:accent-accent-dark text-xs">{formik.errors.message}</div>
              ) : null}
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex justify-center gap-2 cursor-pointer items-center duration-300 bg-primary text-sm dark:bg-primary-dark hover:bg-bg-dark hover:text-text-dark hover:dark:text-text hover:dark:bg-bg px-4 py-2 w-full rounded-xl"
            >
              {loading ? 'Sending..' : 'Send Message'}
              <Send className="size-4" />
            </button>
          </form>

          {submitStatus && (
            <div
              className={`mt-4 px-4 py-2 flex gap-2 justify-center text-sm rounded-xl bg-accent dark:bg-accent-dark text-text dark:text-text-dark`}
            >
              {submitStatus.message}
              {submitStatus.type === 'success' && <BadgeCheck className='size-5' />}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Contact;
