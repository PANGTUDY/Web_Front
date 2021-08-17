<template>
  <header class="header-global">
    <div style="position: relative">
      <base-nav type="primary" effect="dark" expand>
        <a class="navbar-brand" href="#">Default Color</a>

        <div class="row" slot="content-header" slot-scope="{ closeMenu }">
          <div class="col-6 collapse-brand">
            <img src="..\\..\\public\\img\\icons\\common\\pangtudy.jpg" />
          </div>
          <div class="col-6 collapse-close">
            <close-button @click="closeMenu"></close-button>
          </div>
        </div>

        <ul class="navbar-nav ml-lg-auto">
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="#"> Discover </a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="#"> Profile </a>
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
