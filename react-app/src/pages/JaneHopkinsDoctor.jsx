import React from "react";
import '../css/JaneHopkinsDoctor.css';
import 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
import 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';

function JaneHopkinsAdmin() {
  return (
    <div class="container">
        <div class="navigation">
            <ul>
                <li>
                    <a href="#">
                        <span class="icon"><ion-icon name="star-outline"></ion-icon></span>
                        <span class="title">Jane Hopkins</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icon"><ion-icon name="home-outline"></ion-icon></span>
                        <span class="title">Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icon"><ion-icon name="person-outline"></ion-icon></span>
                        <span class="title">Patients</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icon"><ion-icon name="chatbubble-ellipses-outline"></ion-icon></span>
                        <span class="title">Message</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icon"><ion-icon name="help-circle-outline"></ion-icon></span>
                        <span class="title">Help</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icon"><ion-icon name="settings-outline"></ion-icon></span>
                        <span class="title">Settings</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                        <span class="title">Password</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icon"><ion-icon name="log-out-outline"></ion-icon></span>
                        <span class="title">Sign Out</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="main">
            <div class="topbar">
                <div class="toggle">
                    <ion-icon name="menu-outline"></ion-icon>
                </div>

                <div class="search">
                    <label>
                        <input type="text" placeholder="Search"></input>
                        <ion-icon name="search-circle-outline"></ion-icon>
                    </label>
                </div>
                <div class="user">
                    <img src="user.png"/>
                </div>
            </div>

            <div class="details">
                <div class="Patients">
                    <div class="cardHeader">
                        <h2>Patients</h2>
                        <a href="#" class="btn">View All</a>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Last Name</td>
                                <td>First Name</td>
                                <td>Date of Birth</td>
                                <td>Age</td>
                                <td>Last Appointment</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>992348</td>
                                <td>Gonzalez</td>
                                <td>Arturo</td>
                                <td>5/4/60</td>
                                <td>62</td>
                                <td>2/22/23</td>
                            </tr>
                            <tr>
                                <td>995485</td>
                                <td>Lopez</td>
                                <td>Alfredo</td>
                                <td>4/24/65</td>
                                <td>57</td>
                                <td>2/22/23</td>
                            </tr>
                            <tr>
                                <td>985575</td>
                                <td>Saldana</td>
                                <td>Marie</td>
                                <td>9/24/65</td>
                                <td>57</td>
                                <td>2/22/23</td>
                            </tr>
                            <tr>
                                <td>972695</td>
                                <td>Saldana</td>
                                <td>Jorge</td>
                                <td>1/24/70</td>
                                <td>53</td>
                                <td>2/22/23</td>
                            </tr>
                            <tr>
                                <td>998684</td>
                                <td>Valenzuela</td>
                                <td>Jorge</td>
                                <td>1/24/78</td>
                                <td>45</td>
                                <td>2/22/23</td>
                            </tr>
                            <tr>
                                <td>954571</td>
                                <td>Garcia</td>
                                <td>Clara</td>
                                <td>12/24/73</td>
                                <td>49</td>
                                <td>2/22/23</td>
                            </tr>
                            <tr>
                                <td>954571</td>
                                <td>Rodriguez</td>
                                <td>Santiago</td>
                                <td>10/31/78</td>
                                <td>44</td>
                                <td>2/22/23</td>
                            </tr>
                            <tr>
                                <td>943462</td>
                                <td>Hernandez</td>
                                <td>Cristiano</td>
                                <td>3/24/60</td>
                                <td>62</td>
                                <td>2/22/23</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
  );

    let toggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation');
    let main = document.querySelector('.main');

    toggle.onclick = function(){
        navigation.classList.toggle('active')
        main.classList.toggle('active')
    }

    let list = document.querySelectorAll('.navigation li');
    function activeLink() {
        list.forEach((item) =>
            item.classList.remove('hovered'));
            this.classList.add('hovered');
    }
    list.forEach((item) => 
        item.addEventListener('mouseover',activeLink));
}

export default JaneHopkinsAdmin;
