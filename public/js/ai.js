import {
    FaceLandmarker,
    FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest";

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let faceLandmarker;

// Eye landmark indices
const leftEye = [33, 160, 158, 133, 153, 144];
const rightEye = [362, 385, 387, 263, 373, 380];

// Eye open timer
let eyesOpenStart = null;
const REQUIRED_OPEN_TIME = 3000; // 3 seconds

// Distance between two points
function distance(p1, p2) {
    return Math.sqrt(
        Math.pow(p1.x - p2.x, 2) +
        Math.pow(p1.y - p2.y, 2)
    );
}

// Calculate Eye Aspect Ratio
function calculateEAR(landmarks, eye) {

    const p1 = landmarks[eye[0]];
    const p2 = landmarks[eye[1]];
    const p3 = landmarks[eye[2]];
    const p4 = landmarks[eye[3]];
    const p5 = landmarks[eye[4]];
    const p6 = landmarks[eye[5]];

    const vertical1 = distance(p2, p6);
    const vertical2 = distance(p3, p5);
    const horizontal = distance(p1, p4);

    return (vertical1 + vertical2) / (2 * horizontal);
}

// Start Camera
async function startCamera() {

    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    });

    video.srcObject = stream;
    await video.play();

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
}

// Load MediaPipe
async function loadMediaPipe() {

    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    faceLandmarker = await FaceLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
            },
            runningMode: "VIDEO",
            numFaces: 1
        }
    );

    console.log("FaceLandmarker Ready ✅");
}

// Detect Face
function detectFace() {

    const results = faceLandmarker.detectForVideo(
        video,
        performance.now()
    );

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.faceLandmarks.length > 0) {

        const landmarks = results.faceLandmarks[0];

        // Draw landmarks
        landmarks.forEach(point => {

            ctx.beginPath();

            ctx.arc(
                point.x * canvas.width,
                point.y * canvas.height,
                2,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "red";
            ctx.fill();

        });

        // EAR
        const leftEAR = calculateEAR(landmarks, leftEye);
        const rightEAR = calculateEAR(landmarks, rightEye);

        const ear = (leftEAR + rightEAR) / 2;

        const THRESHOLD = 0.30;

        if (ear > THRESHOLD) {

            if (eyesOpenStart === null) {
                eyesOpenStart = Date.now();
            }

            const openTime = Date.now() - eyesOpenStart;

            console.log(
                "Eyes Open:",
                (openTime / 1000).toFixed(1),
                "seconds"
            );

            if (openTime >= REQUIRED_OPEN_TIME) {

                console.log("Alarm Stop ✅");

                // if (window.opener && !window.opener.closed) {

                //     window.opener.stopAlarm();

                //     window.close();

                // }
               window.stopAlarm()

            }

        } else {

            eyesOpenStart = null;

            console.log("Eyes Closed 😴");

        }

    }

    requestAnimationFrame(detectFace);

}

// Start Everything
export async function startAI() {

    await startCamera();

    await loadMediaPipe();

    detectFace();

}