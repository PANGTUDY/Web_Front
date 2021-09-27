<template>
    <footer class="footer nav-footer">
        <div class="container">
            <hr>
            <div class="row align-items-center justify-content-md-between">
                <div class="col-md-12">
                    <div class="copyright">
                        &copy; {{year}}
                        <a href="https://github.com/PANGTUDY" target="_blank" rel="noopener">Pangtudy</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
  name: 'app-footer',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
};
</script>
<style>
</style>
