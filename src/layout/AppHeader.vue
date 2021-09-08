<template>
  <header class="header-global">
    <div style="position: relative">
      <base-nav type="honeydew" effect="light" expand>
      <img src="../../public/img/icons/common/pangtudy_logo.jpg.png" width="30px" height="30px"/>
        <a class="navbar-brand"><router-link to="/">Pangtudy</router-link></a>

        <div class="row" slot="content-header" slot-scope="{ closeMenu }">
          <div class="col-6 collapse-brand">
            <img src="..\\..\\public\\img\\icons\\common\\pangtudy.jpg" />
          </div>
          <div class="col-6 collapse-close">
            <close-button @click="closeMenu"></close-button>
          </div>
        </div>

        <ul class="navbar-nav ml-lg-auto flex">
          <li class="nav-item">
            <a class="nav-link nav-link-icon"><router-link to="/login">Login</router-link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="#">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="#">Meet</a>
          </li>
          <li class="nav-item">
            
            <img src="../../public/img/icons/common/calendar.png" width="20px" height="20px"/>
            <a class="nav-link nav-link-icon" href="#">Calendar</a>
          </li>
          <base-dropdown tag="li" title="Settings">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </base-dropdown>
        </ul>
      </base-nav>
    </div>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
  },
};
</script>
<style>

</style>
