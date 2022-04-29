import React from 'react'
// import style from '../css/style.css'

export default function navbar() {
  return (
    <nav classname="sidebar sidebar-offcanvas" id="sidebar">
      <ul classname="nav">
        <li classname="nav-item sidebar-category">
          <p>Navigation</p>
          <span></span>
        </li>
        <li classname="nav-item">
          <a classname="nav-link" href="index.html">
            <i classname="mdi mdi-view-quilt menu-icon"></i>
            <span classname="menu-title">Dashboard</span>
            <div classname="badge badge-info badge-pill">2</div>
          </a>
        </li>
        <li classname="nav-item sidebar-category">
          <p>Components</p>
          <span></span>
        </li>
        <li classname="nav-item">
          <a classname="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
            <i classname="mdi mdi-palette menu-icon"></i>
            <span classname="menu-title">UI Elements</span>
            <i classname="menu-arrow"></i>
          </a>
          <div classname="collapse" id="ui-basic">
            <ul classname="nav flex-column sub-menu">
              <li classname="nav-item"> <a classname="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
              <li classname="nav-item"> <a classname="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
            </ul>
          </div>
        </li>
        <li classname="nav-item">
          <a classname="nav-link" href="pages/forms/basic_elements.html">
            <i classname="mdi mdi-view-headline menu-icon"></i>
            <span classname="menu-title">Form elements</span>
          </a>
        </li>
        <li classname="nav-item">
          <a classname="nav-link" href="pages/charts/chartjs.html">
            <i classname="mdi mdi-chart-pie menu-icon"></i>
            <span classname="menu-title">Charts</span>
          </a>
        </li>
        <li classname="nav-item">
          <a classname="nav-link" href="pages/tables/basic-table.html">
            <i classname="mdi mdi-grid-large menu-icon"></i>
            <span classname="menu-title">Tables</span>
          </a>
        </li>
        <li classname="nav-item">
          <a classname="nav-link" href="pages/icons/mdi.html">
            <i classname="mdi mdi-emoticon menu-icon"></i>
            <span classname="menu-title">Icons</span>
          </a>
        </li>
        <li classname="nav-item sidebar-category">
          <p>Pages</p>
          <span></span>
        </li>
        <li classname="nav-item">
          <a classname="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
            <i classname="mdi mdi-account menu-icon"></i>
            <span classname="menu-title">User Pages</span>
            <i classname="menu-arrow"></i>
          </a>
          <div classname="collapse" id="auth">
            <ul classname="nav flex-column sub-menu">
              <li classname="nav-item"> <a classname="nav-link" href="pages/samples/login.html"> Login </a></li>
              <li classname="nav-item"> <a classname="nav-link" href="pages/samples/login-2.html"> Login 2 </a></li>
              <li classname="nav-item"> <a classname="nav-link" href="pages/samples/register.html"> Register </a></li>
              <li classname="nav-item"> <a classname="nav-link" href="pages/samples/register-2.html"> Register 2 </a></li>
              <li classname="nav-item"> <a classname="nav-link" href="pages/samples/lock-screen.html"> Lockscreen </a></li>
            </ul>
          </div>
        </li>
        <li classname="nav-item sidebar-category">
          <p>Apps</p>
          <span></span>
        </li>
        <li classname="nav-item">
          <a classname="nav-link" href="docs/documentation.html">
            <i classname="mdi mdi-file-document-box-outline menu-icon"></i>
            <span classname="menu-title">Documentation</span>
          </a>
        </li>
        <li classname="nav-item">
          <a classname="nav-link" href="https://www.bootstrapdash.com/product/spica-admin/">
            <button classname="btn bg-danger btn-sm menu-title">Upgrade to pro</button>
          </a>
        </li>
      </ul>
    </nav>
  )
}
