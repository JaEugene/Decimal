@@ .. @@
     if (!container) return;
     
     const point = document.createElement('div');
-    point.className = 'absolute w-4 h-4 bg-black rounded-full blur-sm transition-all duration-300';
+    point.className = 'absolute w-4 h-4 bg-stripe-blue/30 rounded-full blur-sm transition-all duration-300';
     container.appendChild(point);
     
     let position = 0;
@@ .. @@
       }
       
       point.style.transform = `translateX(${position}px)`;
-      point.style.boxShadow = `0 0 20px 5px rgba(0, 0, 0, 0.5)`;
+      point.style.boxShadow = `0 0 20px 5px rgba(49, 46, 129, 0.3)`;
       
       requestAnimationFrame(animate);
     };