<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Submodule mail</title>
    
    <style>
    .fcc-btn {
       background-color: #66d4c3;
       color: white;
       padding: 15px 25px;
       text-decoration: none;
        }
     .fcc-btn:hover {
       background-color: #66d48d;
        }   
             
    </style>
  </head>
  <body>
    <div
      style="
        border: 3px solid rgba(0, 0, 0, 0.1);
        background: rgba(0, 0, 0, 0.05);
        margin: 0% 3% 0 3%;
        border-radius: 21px;
      "
    >
      <header>
     <!--   <div>
          <h1
            style="
              display: flex;
              flex-direction: row;
              justify-content: center;
              font-size: 22px;
              padding-top: 2%;
              font-weight: bold !important;
              font-family: 'Times New Roman', Times, serif;
              -webkit-text-fill-color: rgb(180, 169, 169);
              -webkit-text-stroke-width: 1px;
              -webkit-text-stroke-color: black;
            "
          >
            Daimler-G3C
          </h1>
        </div>-->
      </header>
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: center;
          padding-left: 4%;
        "
      >
        <div style="background: white; border-radius: 10px; padding: 3%">
          <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif">
            Hi ${reciverName},
          </p>
          <p style="font-size: 15px">
            Business case for the ${projectName} has been created
          </p>
           
           
          <p style="font-size: 15px">
                Kindly click the approve button to approve the Business case.
          </p>

         
         <div
            style="display: flex; flex-direction: row; justify-content: center"
          >
          <a target="_blank" class="fcc-btn" href="${redirecturl}" style=" text-decoration:none;  color: white;"
                 target="_blank"">Approve</a>
         </div>
          <p
            style="
              font-size: 16px;
              font-family: Arial, Helvetica, sans-serif;
              margin-top: 20%;
            "
          >
            Thank you,
          </p>
          <p
            style="
              font-size: 15px;
              font-family: Arial, Helvetica, sans-serif;
              margin-top: -1%;
              padding-left: 1%;
            "
          >
            G3C Team
          </p>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; justify-content: center">
        <div>
          <h1 style="font-size: 10px">Daimler-G3C</h1>
          <p style="font-size: 10px">
            © 2022 <a href="https://asia.daimlertruck.com/" id="about">Damiler India</a>
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
