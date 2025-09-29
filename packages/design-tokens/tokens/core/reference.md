## colors ref

{
  "palette": {
  "gray": {
      "50": "#EEEFFC",   //  card titles like  Todo, Connect GitHub or GitLab, Issue title
      "100": "#DCDBFE",  // modals Text : New issue, badge label (others) : Priprtt assignee
      "200": "#D2D3E0",  // modal : active badge: backlog 
      "300": "#8A8F98",  // card text input placeholder : Description...
      "400": "#858699",  // text label on cards like (Fig 4 , Fig 5), count 4/
      "500": "#595974",  // badge Backlog etc background color
      "600": "#4C4F6B"   // counter text (/10) issue type heder
  }
    "purple": {
      "500": "#575BC7"   // primary button background : Create issue btn
    },
    "black": {
      "500": "#000000"   // modal shadow
    },
    "neutral": {
      "900": "#191A23",  // app bg 
      "950": "#1D1E2B"   // create issue modal bg
    },
    "white": {
      "500": "#FFFFFF"   // button text
    }
  }
}

## border ref

{
  "border": {
    "width": {
      "sm": "1px" // card border
    }
  }
}

## radius ref

{
  "radius": {
    "sm": "4px", //card radius , badge radis liek Backlog etc
    "md": "8px" // new issue modal 
  }
}

## spacing ref
{
  "spacing": {
    "xs": "2px",      // very small gaps (Issue title ↔ Description, Todo label ↔ icon)
    "sm": "6px",      // small gaps (badges, inline compact spacing)
    "md": "8px",      // card vertical spacing
    "lg": "12px",     // spacing between icons on card right side
    "xl": "16px"      // section spacing (New Issue -- Issue Title)
  }
}

## semantic theme tokens (Dark Mode)

### background colors
{
  "bg-app": "#191A23",           // main app bg
  "bg-modal": "#1D1E2B",         // modal bg  
  "bg-card": "#1D1E2B"           // Issue card bg (same as modal)
}

### text colors
{
  "text-primary": "#EEEFFC",     // primary text (Issue titles, headings)
  "text-secondary": "#8A8F98",   // secondary text (Descriptions) 4/ counter
  "text-tertiary" : "#4C4F6B", // total counter /10
}




###  buttons
{
  "button-primary": "#575BC7",    // primary button bg (Create issue)
  "button-text": "#FFFFFF"       // button text color
}

### badges
{
 "bg-badge":"#595974" // badges like backlog , assignee , label
}

### layout
{
  "border-card": "#1D1E2B",       // card border color (same as card bg)
  "modal-shadow": "#000000",      // Modal shadow color
  "radius-card": "4px",           // card border radius
  "radius-modal": "8px",          // modal border radius
  "border-card-width": "1px"      // card border width
}

### typography 
{
  "font-family-primary": "Inter",      // primary font family
  "font-family-secondary": "Geist",    // secondary font family
  "font-size-title": "18px",           // Issue titles, headings
  "font-size-body": "13px",            // body txt, descriptions
  "font-size-small": "12px",           // small txt, counters
  "font-weight-regular": "400",        // regular txt weight
  "font-weight-medium": "500"          // medium txt weight (titles)
}

### spacing semantic
{
  "gap-tiny": "2px",            // Tiny gaps (Issue title ↔ Description)
  "gap-small": "6px",           // Small gaps (badges, compact spacing)
  "gap-medium": "8px",          // Medium gaps (card vertical spacing)
  "gap-large": "12px",          // Large gaps (icon spacing)
  "gap-section": "16px"         // Section spacing (New Issue -- Issue Title)
}

## light mode ( colors flipped from dark mode)

bg-app: neutral.900 → white.500
bg-modal: neutral.950 → gray.50
bg-card: neutral.950 → gray.50
bg-badge: gray.500 → gray.200
text-primary: gray.50 → neutral.900
text-secondary: gray.400 → gray.500
text-tertiary: gray.600 → gray.400
text-muted: gray.300 → gray.400
text-badge-active: gray.200 → gray.600
text-badge-inactive: gray.100 → gray.500
text-placeholder: gray.300 → gray.400
text-modal-header: gray.200 → gray.600
border-card: neutral.950 → gray.200
modal-shadow: black.500 → black.500
button-primary: purple.500 → purple.500
button-text: white.500 → white.500