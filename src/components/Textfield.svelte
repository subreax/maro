<script>
     export let labelContent, inputContent, type;

     function typeAction(node) {
         node.type = type;
     }


</script>


<div class="field">
    <input bind:value={inputContent} use:typeAction required>
    <label>{labelContent}</label>
 </div>

 <style>
     
.field{
  height: 50px;
  width: 100%;
  position: relative;
}
.field input{
  height: 100%;
  width: 100%;
  outline: none;
  font-size: 17px;
  padding-left: 20px;
  border: 2px solid lightgrey;
  border-radius: 25px;
  transition: all 0.3s ease;
}
.field input:focus,
.field input:valid{
  border-color: black;
}
.field label{
  position: absolute;
  top: 50%;
  left: 20px;
  color: #999999;
  font-weight: 400;
  font-size: 17px;
  pointer-events: none;
  transform: translateY(-50%);
  transition: all 0.3s ease;
}
.field input:focus ~ label,
.field input:valid ~ label{
  top: 0%;
  font-size: 16px;
  color: black;
  background: #fff;
  transform: translateY(-50%);
}

.field input[type="submit"]{
  color: #fff;
  border: none;
  padding-left: 0;
  margin-top: -10px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  background: linear-gradient(-135deg, #c850c0, #4158d0);
  transition: all 0.3s ease;
}
.field input[type="submit"]:active{
  transform: scale(0.95);
}


 </style>