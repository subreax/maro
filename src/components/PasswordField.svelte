<script>
    export let labelContent, inputContent, idIcon, idPassword;

    function togglePassword() {
        let input = document.getElementById(idPassword);
        let icon = document.getElementById(idIcon);
        
	    if (input.getAttribute('type') == 'password') {
		    input.setAttribute('type', 'text');
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
	    } 
        else {
		    input.setAttribute('type', 'password');
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
	    }
    }
</script>


<div class="field">
   <input id={idPassword} type="password" bind:value={inputContent}  required>
   <label>{labelContent}</label>

   <div class="input-icon"  on:click={togglePassword}>
        <i id={idIcon} class="fa-sharp fa-solid fa-eye-slash"></i>
   </div>
</div>

<style>
    .input-icon {
        font-size: 25px;
        position: absolute;
        top: 20px;
        right: -6px;
        transition: all .4s ease;
    }
</style>