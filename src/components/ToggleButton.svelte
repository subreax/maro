<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let toggled = false;
    export let toggleLocked = false;
    export let style = "";
    export let className = "btn__toggle"; // css classes used to style button
    export let toggledClass = "btn__toggle--active"; // css classes used to style toggled button

    function onClick(e) {
        e.preventDefault(); 
        
        if (!toggleLocked) {
            toggled = !toggled;
            dispatch("toggle", {toggle: toggled});
        }
    }

</script>

<button 
    class="{className} {toggled ? toggledClass : ""}" 
    style={style}
    on:click={onClick}>
    
    <slot></slot>

</button>