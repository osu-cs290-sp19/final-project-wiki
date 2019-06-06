(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['wiki'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <!-- input section name and section text -->\r\n"
    + ((stack1 = container.invokePartial(partials.section,depth0,{"name":"section","data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <main>\r\n\r\n      <div>\r\n        <h1 id ='nameOfPage'>\r\n          "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\r\n        </h1>\r\n        <p id = 'textInSummary'>\r\n            Add text Summary\r\n        </p>\r\n      </div>\r\n\r\n      <div>\r\n        <img src=\""
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "\" alt=\"Growing tomato\">\r\n      </div>\r\n\r\n\r\n      <div id = 'sectionsContainer'>\r\n            "
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.sectionData : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </div>\r\n\r\n    </main>\r\n\r\n    <button type=\"button\" id=\"edit-page-button\"><p>Edit</p></button>\r\n";
},"usePartial":true,"useData":true});
})();