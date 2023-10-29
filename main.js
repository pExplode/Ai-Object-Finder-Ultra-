status="";
context="";
objects = [];

function setup()
{
    canvas = createCanvas(480,350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,350);
    video.hide();
}

function draw()
{
    image(video,0,0,480,350);

    if(status != "")
    {
        objectDetector.detect(video, gotResults)
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Detecting Objects"; 
            percent = floor(objects[i].confidence * 100);
            fill("white");
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15, objects[i].width, objects[i].height,);
            noFill();
            stroke("grey");
            rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height);

            if(objects[i].label == context)
            {
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("found").innerHTML = context + " Found";
                var synth = window.speechSynthesis;
                speak_data = context + " is found";
                utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }

            else
            {
                document.getElementById("found").innerHTML = context + " Not Found";
            }

        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    context = document.getElementById("tinput").value; 
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    console.log(context);
}

function gotResults(error , results)
{
    if(error)
    {
        console.log(error);
    }

    console.log(results);
    objects = results;
}
