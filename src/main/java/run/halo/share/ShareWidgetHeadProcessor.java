package run.halo.share;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.model.IModel;
import org.thymeleaf.model.IModelFactory;
import org.thymeleaf.processor.element.IElementModelStructureHandler;
import reactor.core.publisher.Mono;
import run.halo.app.infra.utils.JsonUtils;
import run.halo.app.plugin.ReactiveSettingFetcher;
import run.halo.app.theme.dialect.TemplateHeadProcessor;
import java.util.HashMap;
import java.util.Map;

@Component
public class ShareWidgetHeadProcessor implements TemplateHeadProcessor {

    private ReactiveSettingFetcher reactiveSettingFetcher;

    public ShareWidgetHeadProcessor() {
    }

    @Override
    public Mono<Void> process(ITemplateContext context, IModel model,
        IElementModelStructureHandler structureHandler) {
        final IModelFactory modelFactory = context.getModelFactory();
        if(!isPostTemplate(context)) {
            var siteJson = JsonUtils.DEFAULT_JSON_MAPPER
                .convertValue(context.getVariable("site"), JsonNode.class);
            var siteMap = new HashMap<String, Object>();
            siteMap.put("title", siteJson.get("title"));
            siteMap.put("img",siteJson.get("logo"));
            siteMap.put("subtitle",siteJson.get("subtitle"));
            siteMap.put("owner","");
            siteMap.put("excerpt",siteJson.get("subtitle"));
            model.add(modelFactory.createText(shareWidgetScript(siteMap)));
            return Mono.empty();
        }
        // now is post template page
        var postJson = JsonUtils.DEFAULT_JSON_MAPPER
            .convertValue(context.getVariable("post"), JsonNode.class);
        var siteMap = new HashMap<String, Object>();
        System.out.println("---->" + postJson.at("/spec/title"));
        siteMap.put("title", postJson.at("/spec/title"));
        siteMap.put("img",postJson.at("/spec/cover"));
        siteMap.put("subtitle","");
        siteMap.put("owner",postJson.at("/spec/owner"));
        siteMap.put("excerpt",postJson.at("/status/excerpt"));

        model.add(modelFactory.createText(shareWidgetScript(siteMap)));
        return Mono.empty();
    }

    private boolean isPostTemplate(ITemplateContext context) {
        return "post".equals(context.getVariable("_templateId"));
    }

    private String shareWidgetScript( Map<String, Object> config) {
        return """
                <!-- PluginShareWidget start -->
                <script>
                window.siteConfig = %s
                </script>
                <script src="/plugins/PluginShareWidget/assets/static/share-widget.iife.js" async></script>
                <!-- PluginShareWidget end -->
                """.formatted(JsonUtils.objectToJson(config));
    }
}