import React, { Component } from 'react'

class Icon extends Component {
  render() {
    const { icon, width, height, fill, color } = this.props
    const svg = {
      facebook: () => {
        return (
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={width ? width : 16}
            height={height ? height : 16}
            viewBox="0 0 16 16">
            <path
              fill={color ? color : '#cccccc'}
              d="M8.5,16H0.9C0.4,16,0,15.6,0,15.1V0.9C0,0.4,0.4,0,0.9,0h14.2C15.6,0,16,0.4,16,0.9v14.2c0,0.5-0.4,0.9-0.9,0.9
	H11V9.8h2.1l0.3-2.4H11V5.8c0-0.7,0.2-1.2,1.2-1.2l1.3,0V2.5c-0.2,0-1-0.1-1.9-0.1c-1.8,0-3.1,1.1-3.1,3.2v1.8H6.5v2.4h2.1V16z"
            />
          </svg>
        )
      },
      twitter: () => {
        return (
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={16}
            height={13.5}
            viewBox="0 0 16 13.5">
            <path
              fill={color ? color : '#cccccc'}
              d="M16,1.6c-0.6,0.3-1.2,0.5-1.9,0.5c0.7-0.4,1.2-1.1,1.4-1.9c-0.6,0.4-1.3,0.7-2.1,0.8C12.9,0.4,12,0,11.1,0
	C9.3,0,7.8,1.5,7.8,3.4c0,0.3,0,0.5,0.1,0.8C5.2,4,2.7,2.7,1.1,0.6C0.8,1.1,0.7,1.7,0.7,2.3c0,1.2,0.6,2.2,1.5,2.8
	c-0.5,0-1-0.2-1.5-0.4v0c0,1.7,1.1,3,2.6,3.3C3,8.2,2.7,8.3,2.4,8.3c-0.2,0-0.4,0-0.6-0.1c0.4,1.4,1.6,2.3,3.1,2.4
	C3.7,11.5,2.3,12,0.8,12c-0.3,0-0.5,0-0.8,0c1.5,1,3.2,1.5,5,1.5c6,0,9.3-5.2,9.3-9.7c0-0.1,0-0.3,0-0.4C15,2.9,15.6,2.3,16,1.6"
            />
          </svg>
        )
      },
      linkedin: () => {
        return (
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={15.9}
            height={14.8}
            viewBox="0 0 15.9 14.8">
            <path
              id="Page-1_1_"
              fill={color ? color : '#999999'}
              d="M0,14.8h3.2V4.2H0V14.8z M1.6,0C0.7,0,0,0.7,0,1.6c0,0.9,0.7,1.6,1.6,1.6c0.9,0,1.6-0.7,1.6-1.6
         C3.2,0.7,2.5,0,1.6,0z M15.9,8.8v6h-3.2V9c0-1.2-0.3-2.4-1.7-2.4S8.5,7.8,8.5,9v5.8H5.3V4.2h3.2v1.5c1-1.2,2.4-1.8,3.9-1.8
         S15.9,4.6,15.9,8.8z"
            />
          </svg>
        )
      },
      compass: () => {
        return (
          <svg
            width={width ? width : '36'}
            height={height ? height : '37'}
            viewBox="0 0 42 46"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M46,47.0066478 L44.2634482,48 L37.6241573,36.5834456 C34.9668568,37.4768629 31.9562963,37.9825331 29,37.9825331 C24.8199991,37.9825331 21.0526614,36.9971758 17.5340154,35.2683033 L10.130404,48 L8.39385225,47.0066478 L15.7717222,34.3189224 C10.3442553,31.1230067 6.12663241,26.0603085 4,19.9922659 L6.10485126,19.9922659 C8.14435906,25.3187921 11.9699213,29.7079296 16.7993965,32.550076 L23.3999996,20.9516402 C21.4278154,19.7164458 20,17.5278731 20,15.0115142 C20,11.4778188 22.6358022,8.48368455 26,8 L26,2 L28,2 L28,8 C31.3404366,8.50167282 34,11.4938084 34,15.0115142 C34,17.5158809 32.6563442,19.6984575 30.7000008,20.9376494 L46,47.0066478 Z M32,15.0200005 C32,12.2558032 29.9037292,10.0127743 27.1771251,10.0127743 C24.450521,10.0127743 22,12.2513144 22,15.0155116 C22,17.7757115 24.2733959,20.0162503 27,20.0162503 C29.7266041,20.0162503 32,17.7802003 32,15.0200005 Z M28.7999992,21.743124 C28.2178485,21.9030198 27.6336335,22.0169455 27,22.0169455 C26.3782471,22.0169455 25.7742311,21.9070172 25.2000008,21.7531175 L18.5458489,33.531436 C21.7674791,35.0884206 25.1863184,35.9818379 29,35.9818379 C31.5879968,35.9818379 34.2540191,35.5661091 36.5984631,34.8165979 L28.7999992,21.743124 Z"
              id="path-1"
            />
            <g id="New-UI-8om" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Services-Final" transform="translate(-206.000000, -1164.000000)">
                <g id="2.-Icon-/-2.-Icon-Box-/-25-Size--/-ic_compass" transform="translate(202.000000, 1162.000000)">
                  <mask id="mask-2" fill="white">
                    <use />
                  </mask>
                  <g id="ic_compass" fillRule="nonzero" />
                  <g id="3.-Color-/-2.-Gray-/-4.-Gray-40" mask="url(#mask-2)" fill="#666666" fillRule="evenodd">
                    <rect id="Gary-40" x="0" y="0" width="50" height="50" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        )
      },
      trckr: () => {
        return (
          <svg
            fill="none"
            width={width ? width : '48'}
            height={height ? height : '48'}
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient">
                <stop offset="5%" stopColor="#4a49ff" />
                <stop offset="95%" stopColor="#2b89e1" />
              </linearGradient>
            </defs>
            <path
              fill="url(#gradient)"
              d="M26.715,13.344h-3.689c-2.16,0.135-4.183,1.085-5.287,2.688h-1.776l0.007,0.002h-1.961 c-0.127,0-0.267,0.005-0.398-0.002h-0.118c-0.286,0-0.516-0.23-0.516-0.516c0-0.286,0.23-0.516,0.516-0.516h3.384 c0.137,0,0.242,0.01,0.547,0l1.224-0.926l0.943-0.713h-3.125c-1.68,0.05-2.187,0-3.278,0.139c-1.229,0.134-2.05,1.09-2.05,2.184 c-0.137,1.092,0.684,2.049,1.776,2.323c0.821,0.137,1.776,0.137,2.597,0.137h1.092c-0.137,0.545-0.273,1.092-0.273,1.639v6.966 c0,1.229,0.547,2.324,1.502,3.006c2.187,1.777,5.467,0.41,5.738-2.458c0.273-2.597,0.137-5.327,0.137-7.924l0.005-0.137h-0.108 c0,0-0.034,0.002-0.034,0c-1.092,0-1.639,0.547-1.639,1.639v5.875c0,0.82-0.408,1.369-1.092,1.779 c-1.366,0.682-2.871-0.41-2.871-2.051v-6.422c0-2.733,2.187-5.083,4.783-5.083h3.278c0.027,0,0.06,0.002,0.089,0.007h0.315 c0.291,0,0.525,0.235,0.525,0.525c0,0.12-0.041,0.233-0.109,0.322c-0.082,0.105-0.205,0.18-0.344,0.197 c-0.021,0.005-0.048,0.007-0.072,0.007h-3.397c-0.029,0-0.058-0.002-0.086-0.007h-0.473c-1.776,0.137-3.416,2.119-3.416,3.758v6.839 c0,0.229,0.091,0.433,0.24,0.581c0.146,0.148,0.353,0.238,0.579,0.238c0.453,0,0.82-0.365,0.82-0.819v-6.158 c0-1.5,0.821-2.321,2.323-2.321h3.276c0.96,0,1.778-0.411,2.188-1.231C29.174,15.411,28.217,13.754,26.715,13.344z M38.557,22.961 H37.38c-0.821,0-1.483,0.665-1.483,1.483c0,0.817,0.662,1.48,1.483,1.48h1.177c0.817,0,1.48-0.663,1.48-1.48 C40.037,23.625,39.375,22.961,38.557,22.961z M32.621,23.077c-0.217,0.936-0.541,1.855-0.973,2.736h2.844 c0.303-0.898,0.533-1.812,0.697-2.736H32.621z M45.684,17.365H32.697c0.183,0.9,0.27,1.819,0.255,2.736h12.731 c0.754,0,1.367-0.615,1.367-1.368C47.052,17.977,46.438,17.365,45.684,17.365z M39.275,11.261H37.38 c-0.821,0-1.483,0.665-1.483,1.483c0,0.669,0.441,1.233,1.053,1.416h2.76c0.607-0.183,1.049-0.747,1.049-1.416 C40.757,11.926,40.094,11.261,39.275,11.261z M41.124,28.788h-11.29c-0.195,0.233-0.41,0.458-0.628,0.677 c-2.417,2.417-5.636,3.751-9.061,3.751s-6.638-1.335-9.062-3.751c-0.218-0.219-0.429-0.445-0.628-0.677H7.596 c-0.759,0-1.368-0.614-1.368-1.368s0.609-1.368,1.368-1.368H8.64c-1.248-2.545-1.604-5.42-1.059-8.151l0.161-0.555H4.74 c-0.881,0-1.596-0.713-1.596-1.596c0-0.881,0.715-1.594,1.596-1.594h4.212c0.562-1.01,1.272-1.961,2.131-2.82 c2.419-2.417,5.638-3.749,9.062-3.749s6.644,1.332,9.06,3.749c0.859,0.859,1.57,1.81,2.135,2.825h3.85 c-0.311-0.922-0.69-1.824-1.151-2.7h-1.445c-0.758,0-1.366-0.614-1.366-1.368c0-0.756,0.608-1.368,1.366-1.368h7.524 c0.753,0,1.367-0.615,1.367-1.368c0-0.756-0.614-1.368-1.367-1.368h-25.2c-0.564,0-1.046-0.341-1.255-0.828 c-0.075-0.166-0.113-0.348-0.113-0.54c0-0.756,0.609-1.368,1.368-1.368h13.94C22.339-0.017,14.318,0.62,8.383,5.161 c-0.629,0.48-1.236,1.006-1.814,1.574c-7.493,7.375-7.493,19.334,0,26.709L20.146,46.8l1.623-1.596H21.42 c-0.758,0-1.368-0.614-1.368-1.368c0-0.756,0.61-1.367,1.368-1.367h3.127l2.781-2.736H17.316c-0.758,0-1.368-0.614-1.368-1.367 c0-0.754,0.609-1.368,1.368-1.368h12.793l2.783-2.735h-1.896c-0.758,0-1.367-0.613-1.367-1.367s0.609-1.369,1.367-1.369h10.128 c0.754,0,1.368-0.613,1.368-1.367C42.492,29.4,41.877,28.788,41.124,28.788z"
            />
          </svg>
        )
      },
      email: () => {
        return (
          <svg width="16px" height="17px" viewBox="0 0 16 13" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path
              fill={color ? color : '#333333'}
              d="M15.9979964,14.501 C15.9979964,14.777 15.7735896,15.001 15.4980903,15.001 L0.49990608,15.001 C0.223404921,15.001 0,14.777 0,14.501 L0,2.501 C0,2.498 0.00200363158,2.495 0.00200363158,2.491 C0.00200363158,2.484 0.00601089475,2.479 0.00601089475,2.472 C0.0120217895,2.356 0.0581053159,2.252 0.131237869,2.17 C0.139252395,2.161 0.135245132,2.147 0.144261474,2.138 C0.155281448,2.127 0.172312316,2.131 0.184334106,2.121 C0.258468474,2.058 0.350635527,2.019 0.453822553,2.01 C0.473858869,2.008 0.48788429,2 0.507920606,2 L15.4920794,2 C15.5121157,2 15.5261411,2.008 15.5451756,2.01 C15.6493645,2.02 15.7395279,2.059 15.8156659,2.121 C15.8276877,2.131 15.8447186,2.127 15.8557385,2.138 C15.8647549,2.147 15.8607476,2.161 15.8687621,2.17 C15.9418947,2.252 15.9869764,2.356 15.9939891,2.472 C15.9939891,2.479 15.9979964,2.484 15.9979964,2.491 C15.9979964,2.494 16,2.497 16,2.501 L16,14.501 L15.9979964,14.501 Z M0.99981216,13.501 C0.99981216,13.777 1.22321708,14.001 1.49971824,14.001 L14.4982781,14.001 C14.7737775,14.001 14.9981842,13.777 14.9981842,13.501 L14.9981842,3.519 L8.3681673,8.827 C8.36115459,8.834 8.36516186,8.846 8.35714733,8.853 C8.25796757,8.952 8.12773151,8.996 7.99949909,8.993 C7.86926304,8.995 7.73902699,8.952 7.64185085,8.853 C7.63383633,8.846 7.63784359,8.834 7.62982907,8.827 L1.00081398,3.519 L1.00081398,13.501 L0.99981216,13.501 Z M7.99849728,7.871 L14.0805209,3.001 L1.91446998,3.001 L7.99849728,7.871 Z"
              id="path-1"
            />
            {/*  <g id="New-UI-8om" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Home" transform="translate(-169.000000, -350.000000)">
                <g id="2.-Icon-/-2.-Icon-Box-/-16-Size--/-ic_email" transform="translate(169.000000, 348.000000)">
                  <mask id="mask-2" fill="white">
                    <use />
                  </mask>
                  <g id="ic_email" fillRule="nonzero" />
                  <g id="3.-Color-/-2.-Gray-/-2.-Gray-20" mask="url(#mask-2)" fill="#333333" fillRule="evenodd">
                    <rect id="Gray-20" x="0" y="0" width="16" height="16" />
                  </g>
                </g>
              </g>
            </g> */}
          </svg>
        )
      },
      contact: () => {
        return (
          <svg width="13px" height="23px" viewBox="0 0 13 23" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Extract" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g
                transform="translate(-705.000000, -4709.000000)"
                fill={color ? color : '#333333'}
                fillRule="nonzero"
                id="Group-4">
                <g transform="translate(706.000000, 4710.000000)">
                  <path
                    d="M9.83258952,0 L1.31101194,0 C0.586960037,-4.4335392e-17 0,0.586960037 0,1.31101194 L0,19.665179 C0,20.3892309 0.586960037,20.976191 1.31101194,20.976191 L9.83258952,20.976191 C10.5566414,20.976191 11.1436015,20.3892309 11.1436015,19.665179 L11.1436015,1.31101194 C11.1436015,0.586960037 10.5566414,4.4335392e-17 9.83258952,0 Z M1.31101194,0.655505968 L9.83258952,0.655505968 C10.1946155,0.655505968 10.4880955,0.948985986 10.4880955,1.31101194 L10.4880955,2.62202387 L0.655505968,2.62202387 L0.655505968,1.31101194 C0.655505968,0.948985986 0.948985986,0.655505968 1.31101194,0.655505968 Z M0.655505968,17.6986611 L0.655505968,3.27752984 L10.4880955,3.27752984 L10.4880955,17.6986611 L0.655505968,17.6986611 Z M9.83258952,20.320685 L1.31101194,20.320685 C0.948985986,20.320685 0.655505968,20.027205 0.655505968,19.665179 L0.655505968,18.3541671 L10.4880955,18.3541671 L10.4880955,19.665179 C10.4880955,20.027205 10.1946155,20.320685 9.83258952,20.320685 Z"
                    id="Shape"
                    stroke={color ? color : '#333333'}
                    strokeWidth="0.3"
                  />
                  <path
                    d="M4.50660353,1.9665179 L6.63699793,1.9665179 C6.8180109,1.9665179 6.96475091,1.81977789 6.96475091,1.63876492 C6.96475091,1.45775195 6.8180109,1.31101194 6.63699793,1.31101194 L4.50660353,1.31101194 C4.32559056,1.31101194 4.17885055,1.45775195 4.17885055,1.63876492 C4.17885055,1.81977789 4.32559056,1.9665179 4.50660353,1.9665179 Z"
                    id="Shape"
                  />
                  <circle fill={color ? color : '#333333'} id="Oval" cx="5.57180073" cy="19.3374261" r="1" />
                </g>
              </g>
            </g>
          </svg>
        )
      },
      notification: () => {
        return (
          <svg
            id="Layer_1"
            width={width ? width : '53.95'}
            height={height ? height : '71.44'}
            dataname="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 53.95 71.44">
            <path
              className="cls-1"
              fill={fill ? fill : '#fff'}
              d="M52,60.83H4V31.55c-.06-.71-.09-1.38-.09-2A23.88,23.88,0,0,1,28,5.89,23.88,23.88,0,0,1,52.11,29.51c0,.66,0,1.33-.1,2ZM8.85,56H47.2V31.22c.06-.61.08-1.17.08-1.71A19.06,19.06,0,0,0,28,10.7,19.07,19.07,0,0,0,8.75,29.51c0,.54,0,1.1.09,1.71V56Z"
              transform="translate(-1.05 -0.85)"
            />
            <rect className="cls-1" fill={fill ? fill : '#fff'} y="55.05" width="53.95" height="5.05" />
            <path
              className="cls-1"
              fill={fill ? fill : '#fff'}
              d="M28,72.29c-6.63,0-12-6-12-13.4v-2.4h24v2.4C40.05,66.28,34.65,72.29,28,72.29Zm-6.92-11c.87,3.56,3.65,6.18,6.92,6.18S34.07,64.86,35,61.3Z"
              transform="translate(-1.05 -0.85)"
            />
            <rect className="cls-1" fill={fill ? fill : '#fff'} x="24.17" width="5.61" height="7.09" />
          </svg>
        )
      },
      search: () => {
        return (
          <svg
            id="Layer_1"
            dataname="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            width={width ? width : '17.75'}
            height={height ? height : '17.75'}
            viewBox="0 0 17.75 17.75">
            <g id="search">
              <path
                className="cls-1"
                fill={fill ? fill : '#fff'}
                d="M13.93,12.41h-.81l-.31-.31a6.3,6.3,0,0,0,1.63-4.26,6.6,6.6,0,1,0-6.6,6.6,6.3,6.3,0,0,0,4.26-1.63l.31.31v.81L17.48,19,19,17.48Zm-6.09,0a4.57,4.57,0,1,1,4.57-4.57A4.55,4.55,0,0,1,7.84,12.41Z"
                transform="translate(-1.25 -1.25)"
              />
            </g>
          </svg>
        )
      },
      uparrow: () => {
        return (
          <svg
            id="Layer_1"
            dataname="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            width={width ? width : '9'}
            height={height ? height : '13'}
            viewBox="0 0 9 13">
            <path
              className="cls-1"
              fill={fill ? fill : '#ccc'}
              d="M5.25,14V3.74L8,6.35l1-1L4.5,1,0,5.33l1.05,1,2.7-2.61V14Zm-1.5,0"
              transform="translate(0 -1)"
            />
          </svg>
        )
      },
      downarrow: () => {
        return (
          <svg
            id="Layer_1"
            dataname="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            width={width ? width : '9'}
            height={height ? height : '13'}
            viewBox="0 0 9 13">
            <path
              className="cls-1"
              fill={fill ? fill : '#ccc'}
              d="M3.75,1V11.26L1.05,8.65l-1,1L4.5,14,9,9.67l-1-1-2.7,2.61V1Zm0,0"
              transform="translate(0 -1)"
            />
          </svg>
        )
      },
      arrow: () => {
        return (
          <svg id="Layer_1" dataname="Layer 1" xmlns="http://www.w3.org/2000/svg" width={width ? width : '41.2'}
          height={height ? height : '40'} viewBox="0 0 41.2 40"><polygon className="cls-1" fill={fill?fill: "#7d7e80"} points="0 3.85 4.1 0 22.17 19.52 3.37 38.31 0 33.98 14.22 19.16 0 3.85"/><polygon className="cls-1" fill={fill?fill: "#7d7e80"} points="19.04 5.54 23.13 1.69 41.2 21.2 22.41 40 19.04 35.66 33.25 20.84 19.04 5.54"/></svg>
        )
      },
      default: () => {
        return (
          <svg
            fill={color ? color : '#cccccc'}
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
          </svg>
        )
      }
    }
    return svg[icon || 'default']()
  }
}

export { Icon }
