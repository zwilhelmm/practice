/*
At Cruise, all our self-driving cars are electric. They're able to drive around the city autonomously before they need to go back to the garage to charge.

One aspect we look at is how long can the cars drive before they need a charge. Say we got this dataset for a single car composed of timestamp, battery percentage, mode. 0 93 manual indicates that at timestamp 0, we were at 93 battery percentage and we are in manual mode. 

0 93 manual
1 92.34 autonomous
2 91.92 autonomous
3 91.45 manual
4 90.85 autonomous
5 90.22 autonomous
6 89.7 autonomous
7 89.52 autonomous
8 89.23 autonomous
9 88.3 autonomous
10 87.87 autonomous
11 87.56 autonomous
12 86.7 autonomous
13 86.3 manual
14 85.6 manual
15 85.32 manual
16 84.32 autonomous
17 83.68 manual
18 83.15 autonomous
19 82.29 manual
20 81.93 manual
21 81.37 autonomous
22 80.87 autonomous
23 80.03 autonomous
24 79.44 autonomous
25 78.66 manual
26 78.04 autonomous
27 77.72 autonomous
28 77.01 autonomous
29 76.67 manual
30 76.44 autonomous
31 76.39 autonomous
32 75.64 autonomous
33 75.42 autonomous
34 75.33 manual
35 75.08 autonomous
36 74.52 autonomous
37 73.69 autonomous
38 73.13 autonomous
39 72.13 manual
40 71.97 manual
41 71.61 manual
42 71.34 manual
43 70.59 manual
44 70.4 autonomous
45 69.79 autonomous
46 68.98 autonomous
47 68.71 manual
48 68.14 autonomous
49 67.85 autonomous
50 67.72 autonomous
51 67.69 manual
52 67.33 autonomous
53 66.43 autonomous
54 66.17 manual
55 65.27 autonomous
56 64.38 autonomous
57 63.49 autonomous
58 63.39 manual
59 62.41 manual
60 61.92 autonomous
61 61.28 autonomous
62 60.92 autonomous
63 60.34 autonomous
64 59.61 autonomous
65 58.76 autonomous
66 58.0 autonomous
67 57.4 autonomous
68 57.01 manual
69 56.81 manual
70 56.61 manual
71 55.95 autonomous
72 55.09 manual
73 54.18 autonomous
74 53.66 autonomous
75 53.09 autonomous
76 52.62 manual
77 52.39 autonomous
78 51.97 autonomous
79 51.39 autonomous
80 50.43 autonomous
81 49.46 autonomous
82 49.17 autonomous
83 49.06 autonomous
84 48.16 autonomous
85 47.25 autonomous
86 46.25 autonomous
87 46.2 autonomous
88 45.53 autonomous
89 45.26 autonomous
90 44.89 autonomous
91 44.68 manual
92 43.84 autonomous
93 43.42 manual
94 42.9 autonomous
95 42.58 autonomous
96 42.03 autonomous
97 42.02 autonomous
98 41.18 autonomous
99 40.9 autonomous
100 40.69 manual

Every minute our car is on the road, it logs what minute it is, the current battery level, and if the car is in manual or autonomous mode.

The task is to calculate what % of battery we drain per hour, while in autonomous mode. Assume we only switch between modes at the start of each minute.

Solution:
- total battery drain in autonomous mode: 37.930000
- total elapsed minutes in autonomous mode: 72
- Battery drain per minute: 0.526806
- Battery drain per hour: 31.608333
 */
